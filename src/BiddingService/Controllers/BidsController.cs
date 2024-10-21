using BiddingService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;

namespace BiddingService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BidsController : ControllerBase
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Bid>> PlaceBid(string auctionId, int amount)
    {
        var auction = await DB.Find<Auction>().OneAsync(auctionId);
        if (auction == null)
        {
            //todo check with auction service if it is has auction
            return NotFound();
        }

        if (auction.Seller == User.Identity.Name)
        {
            return BadRequest("Seller cannot bid on their own auction");
        }

        var bid = new Bid
        {
            Amount = amount,
            AuctionId = auctionId,
            Bidder = User.Identity.Name,
        };

        if (auction.AuctionEnd < DateTime.UtcNow)
        {
            bid.BidStatus = BidStatus.Finished;
        }
        else
        {
            var highBid = await DB.Find<Bid>()
            .Match(b => b.AuctionId == auctionId)
            .Sort(b => b.Descending(b => b.Amount))
            .ExecuteFirstAsync();

            if (highBid != null && highBid.Amount > amount || highBid == null)
            {
                bid.BidStatus = amount >= auction.ReservePrice ? BidStatus.Accepted : BidStatus.AcceptedBelowReserve;
            }

            if (highBid != null && highBid.Amount <= amount)
            {
                bid.BidStatus = BidStatus.TooLow;
            }
        }



        await DB.SaveAsync(bid);

        return Ok(bid);
    }


    [HttpGet]
    public async Task<ActionResult<List<Bid>>> GetBidsForAuctions(string auctionId)
    {
        var auction = await DB.Find<Auction>().OneAsync(auctionId);
        if (auction == null)
        {
            return NotFound();
        }

        var bids = await DB.Find<Bid>()
        .Match(b => b.AuctionId == auctionId)
        .Sort(b => b.Descending(b => b.BidTime))
        .ExecuteAsync();

        return Ok(bids);
    }
}
