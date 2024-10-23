# How to start the project

1. Clone the repository
2. Run `docker-compose up -d` to start the services
3. Run `npm run web` to start the web app

## MicroservicesBasedOn.Net_NextJS_React

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
Microsoft.AspNetCore.Authentication.JwtBearer \
Grpc.AspNetCore

SSO \
dotnet new install Duende.IdentityServer.Templates \
dotnet new isaspid -o src/IdentityService \
dotnet sln add .\src\IdentityService

Gateway \
dotnet new web -o src/GatewayService \
dotnet sln add .\src\GatewayService

[YARP Reverse Proxy Authentication and Authorization](https://microsoft.github.io/reverse-proxy/articles/authn-authz.html)
Reverse proxy toolkit for building fast proxy servers in .NET using the infrastructure from ASP.NET and .NET \
Microsoft.AspNetCore.Authentication.JwtBearer \

Dockerfile has been writen and now\
docker build -f src/auctionService/Dockerfile -t testing123 .
docker run testing123 \
docker compose build auction-svc \
docker compose down \
docker compose up -d

### NextJS and React

rfc \

npx create-next-app@latest \
npm install react-icons \
npm install react-countdown \
npm install react-hook-form react-datepicker \
npm i flowbite-react - UI Component Library \
npm install react-hot-toast \
npm install @microsoft/signalr

State management solution Zustand [Zustand Demo](https://zustand-demo.pmnd.rs) \
npm install zustand query-string \

#### Images

- [Pixabay](https://pixabay.com/)
- [Unsplash](https://unsplash.com/)
- [Pexels](https://www.pexels.com/)

#### Responsive design with Tailwind CSS

[Responsive Design - Tailwind CSS](https://tailwindcss.com/docs/responsive-design)

## Bid services

dotnet new webapi -o src/BiddingService -controllers \
dotnet sln add .\src\BiddingService\ \
 cd .\src\BiddingService \
 dotnet add reference ../../src/Contracts

[NugetGallery](https://www.nuget.org/)

- **MongoDB.Entities** — A data access library for MongoDB with an elegant API, LINQ support, and built-in entity relationship management.
- **Microsoft.AspNetCore.Authentication.JwtBearer** — ASP.NET Core middleware that enables an application to receive an OpenID Connect bearer token. This package was built from the source code at

[ASP.NET Core GitHub Repository](https://github.com/dotnet/aspnetcore/tree/c2a442982e736e17ae6bcadbfd8ccba278ee1be6).

- **MassTransit.RabbitMQ** — MassTransit RabbitMQ transport support. MassTransit provides a developer-focused, modern platform for creating distributed applications without complexity.
- **Automapper** — A convention-based object-object mapper. 100% organic and gluten-free.
- **Google.Protobuf** — Protocol Buffers is a method of serializing structured data. It is useful in developing programs to communicate with each other over a wire or for storing data.
- **Grpc.Tools** — gRPC and Protocol Buffers compiler for managed C# and native C++ projects. Add this package to a project that contains .proto files to be compiled to code.
- **Grpc.Net.Client** — gRPC C# client library.

### Notifications Service (SignalR)

dotnet new webapi -o src/NotificationService -controllers \
dotnet sln add .\src\NotificationService\ \
cd .\src\NotificationService \
dotnet add reference ../../src/Contracts \
