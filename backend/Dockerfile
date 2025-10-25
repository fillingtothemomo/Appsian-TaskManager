FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy everything and restore/publish
COPY . ./
RUN dotnet restore "TaskManager.csproj"
RUN dotnet publish "TaskManager.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 5000

# Use the PORT provided by Render at runtime; set ASPNETCORE_URLS accordingly and run the app
ENTRYPOINT ["sh", "-c", "export ASPNETCORE_URLS=http://+:$PORT; exec dotnet TaskManager.dll"]
