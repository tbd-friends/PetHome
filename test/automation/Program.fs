module Program

open canopy
open canopy.classic
open canopy.runner
open canopy.runner.classic
open canopy.types
open canopy.configuration
open canopy.reporters
open Common
open EnvProps
open System


[<EntryPoint>]
let main argv =
    //Parse all the args into the types that we use in the rest of the code
    let args = Args.parse argv

    Console.WriteLine (executingDir())
    configuration.chromeDir <- executingDir()
    configuration.firefoxDriverDir <- executingDir()
    configuration.optimizeBySkippingIFrameCheck <- false
    // Disabled Browser Reporting, only supports Chrome
    // reporter <- LiveHtmlReporter(Chrome, configuration.chromeDir) :> IReporter
    // reporter.setEnvironment "EventHorizon.Identity.AuthServer.Testing"

    //Start the browser supplied in args
    start args.Browser

    //Register the tests that you want to run (under development, a specific page, all tests, etc)
    Tests.register args.Tag args.TestType
    //Run tests
    run()

    // Removed Pased after run, not needed since report is printed to console. See Disabled Browser Reporting
    printfn "Press [any key] to exit"
    System.Console.ReadKey() |> ignore
    //Quit all browsers
    quit ()

    //return code
    runner.classic.failedCount