# PetHome

Navigate to src/view folder. 

After cloning;

- Copy sample.appsettings.Development.json to appsettings.Development.json.
- Update the connection string for your database.
- **DO NOT** add settings to appsettings.json

## From a command line / Powershell

- Navigate to the view project (i.e. c:\dev\pethome\src\view)
- After first checkout
```
> dotnet ef database update --context PetHomeContext
> dotnet ef database update --context ApplicationContext
```

When the database is ready

```
> dotnet build
> dotnet run
```
  
## In Visual Studio Code 

- After opening the solution
- Open Package Manager Console

```
> Update-Database -Context IdentityContet
> Update-Database -Context ApplicationContext
```

  Start Debugging
