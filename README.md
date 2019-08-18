# PetHome

Navigate to src/view folder.

## Getting Started

Once you've cloned the repository

- Copy sample.appsettings.Development.json to appsettings.Development.json.
- Update the connection string for your database.
- **DO NOT** add settings to appsettings.json

## From a command line / Powershell

- Create `global.json` file
- Navigate to the view project (i.e. c:\dev\pethome\src\view)
- After first checkout

1. Build

```
> dotnet restore
> dotnet build
```

2. Run Migration / Seed Database

```
> dotnet run /seed
```

3. Run application

```
> dotnet run
```

#### `global.json`

When not using Visual Studio, you may need to cap the version of .NET Core. Use a global.json file to set it to 2.2.300.

## In Visual Studio

- After opening the solution
- Open Package Manager Console

```
> Update-Database -Context IdentityContet
> Update-Database -Context ApplicationContext
```

Start Debugging
