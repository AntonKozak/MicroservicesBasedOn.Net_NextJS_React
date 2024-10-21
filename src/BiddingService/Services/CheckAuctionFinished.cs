


using BiddingService.Models;
using Contracts;
using MassTransit;
using MongoDB.Entities;

namespace BiddingService.Services;

public class CheckAuctionFinished : BackgroundService
{
    private readonly ILogger _logger;
    private readonly IServiceProvider _services;

    public CheckAuctionFinished(ILogger<CheckAuctionFinished> logger, IServiceProvider services)
    {
        _services = services;
        _logger = logger;

    }
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Starting check for finished auctions");

        stoppingToken.Register(() => _logger.LogInformation("Auction check is stopping."));

        while (!stoppingToken.IsCancellationRequested)
        {
            await CheckAuction(stoppingToken);
            await Task.Delay(5000, stoppingToken);
        }
    }

    private async Task CheckAuction(CancellationToken stoppingToken)
    {
        var finishedAuction = await DB.Find<Auction>()
            .Match(a => a.AuctionEnd <= DateTime.UtcNow)
            .Match(a => !a.Finished)
            .ExecuteAsync(stoppingToken);

        if (finishedAuction.Count == 0) return;

        _logger.LogInformation("==> Found {count} finished auctions", finishedAuction.Count);

        using var scope = _services.CreateScope();
        var endpoint = scope.ServiceProvider.GetRequiredService<IPublishEndpoint>();

        foreach (var auction in finishedAuction)
        {
            auction.Finished = true;
            await auction.SaveAsync(null, stoppingToken);

            var winningBid = await DB.Find<Bid>()
                .Match(b => b.AuctionId == auction.ID)
                .Match(b => b.BidStatus == BidStatus.Accepted)
                .Sort(x => x.Descending(s => s.Amount))
                .ExecuteFirstAsync(stoppingToken);

            await endpoint.Publish(new AuctionFinished
            {
                ItemSold = winningBid != null,
                AuctionId = auction.ID,
                Winner = winningBid?.Bidder,
                Amount = winningBid?.Amount ?? 0,
                Seller = auction.Seller
            }, stoppingToken);
        }
    }
}
