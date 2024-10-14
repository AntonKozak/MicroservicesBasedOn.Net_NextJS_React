# MicroservicesBasedOn.Net_NextJS_React

How to build a microservices based app using .Net, NextJS, IdentityServer, RabbitMQ running on Docker and Kubernetes \

dotnet new sln \
dotnet new webapi -o src/AuctionService -controllers \
dotnet sln add .\src\AuctionService\ \
dotnet sln add .\src\SearchService\ \
dotnet new classlib -o src/Contracts \
dotnet sln add .\src\Contracts\ \
dotnet add reference ../../src/Contracts \

dotnet ef migrations add "InitialCreate" -o Data/Migrations \
dotnet new webapi -o src/SearchService -controllers \

docker compose up -d \
docker compose down \
docker volume list \
docker volume rm microservicesbasedonnet_nextjs_react_mongodata \

add packages NugetGallery \
Microsoft.Extensions.Http.Polly \
The HttpClient factory is a pattern for configuring and retrieving named HttpClients in a composable way. \
MassTransit.RabbitMQ \
MassTransit RabbitMQ transport support; MassTransit provides a developer-focused, modern platform for creating distributed applications without complexity. \
