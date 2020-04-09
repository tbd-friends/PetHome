
FROM node:6.7.0

WORKDIR /app/src/view/ClientApp
RUN npm install -g yarn
RUN npm install

FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
WORKDIR /app
# copy csproj and restore as distinct layers
COPY *.sln .
COPY src/view/*.csproj ./src/view/
COPY src/persistence/*.csproj ./src/persistence/
COPY src/tests/*.csproj ./src/tests/
COPY src/handlers/*.csproj ./src/handlers/
COPY src/viewmodels/*.csproj ./src/viewmodels/
COPY test/view.tests/*.*.csproj ./test/view.tests/
RUN dotnet restore
# copy everything else and build app
COPY . ./aspnetapp/
WORKDIR /app/aspnetapp

RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS runtime
WORKDIR /src/view
COPY --from=build /app/aspnetapp/out ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
