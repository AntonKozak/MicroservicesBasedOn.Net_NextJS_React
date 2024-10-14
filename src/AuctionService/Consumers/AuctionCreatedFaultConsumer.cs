using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class AuctionCreatedFaultConsumer : IConsumer<Fault<AuctionCreated>>
{
    public async Task Consume(ConsumeContext<Fault<AuctionCreated>> context)
    {
        Console.WriteLine("---> Auction created fault: {0}", context.Message.Message.Id);

        var exception = context.Message.Exceptions.First();

        if (exception.ExceptionType == "System.ArgumentException")
        {
            context.Message.Message.Model = "Unknown";

            await context.Publish(context.Message.Message);
        }
        else
        {
            Console.WriteLine("Not a arrgument exeption ");
        }


    }
}
