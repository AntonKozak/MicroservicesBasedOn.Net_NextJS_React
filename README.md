# MicroservicesBasedOn.Net_NextJS_React

How to build a microservices based app using .Net, NextJS, IdentityServer, RabbitMQ running on Docker and Kubernetes

dotnet new sln
dotnet new webapi -o src/AuctionService -controllers
dotnet sln add .\src\AuctionService\
add packages NugetGallery
dotnet ef migrations add "InitialCreate" -o Data/Migrations
dotnet new webapi -o src/SearchService -controllers
dotnet sln add .\src\SearchService\
docker compose up -d
