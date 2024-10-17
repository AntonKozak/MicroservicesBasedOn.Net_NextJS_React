# How to start the project

1. Clone the repository
2. Run `docker-compose up -d` to start the services
3. Run `npm run web` to start the web app

# MicroservicesBasedOn.Net_NextJS_React

How to build a microservices based app using .Net, NextJS, IdentityServer, RabbitMQ running on Docker and Kubernetes

dotnet new sln \
dotnet new webapi -o src/AuctionService -controllers \
dotnet sln add .\src\AuctionService\ \
dotnet sln add .\src\SearchService\ \
dotnet new classlib -o src/Contracts \
dotnet sln add .\src\Contracts\ \
dotnet add reference ../../src/Contracts

dotnet ef migrations add "InitialCreate" -o Data/Migrations \
dotnet new webapi -o src/SearchService -controllers

docker compose up -d \
docker compose down \
docker volume list \
docker volume rm microservicesbasedonnet_nextjs_react_mongodata

add packages NugetGallery \
Microsoft.Extensions.Http.Polly \
The HttpClient factory is a pattern for configuring and retrieving named HttpClients in a composable way. \
MassTransit.RabbitMQ \
MassTransit RabbitMQ transport support; MassTransit provides a developer-focused, modern platform for creating distributed applications without complexity.
Microsoft.AspNetCore.Authentication.JwtBearer

SSO \
dotnet new install Duende.IdentityServer.Templates \
dotnet new isaspid -o src/IdentityService \
dotnet sln add .\src\IdentityService

Gateway \
dotnet new web -o src/GatewayService \
dotnet sln add .\src\GatewayService

Yarp.ReverseProxy https://microsoft.github.io/reverse-proxy/articles/authn-authz.html \
Reverse proxy toolkit for building fast proxy servers in .NET using the infrastructure from ASP.NET and .NET \
Microsoft.AspNetCore.Authentication.JwtBearer \

Dockerfile has been writen and now\
docker build -f src/auctionService/Dockerfile -t testing123 .
docker run testing123 \
docker compose build auction-svc \
docker compose up -d \
