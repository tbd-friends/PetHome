module Auth.Assertions

open System
open canopy.classic
open canopy.runner.classic
open Auth.Login

let smoke () =
    context "Smoke Auth Assertions"
    once (fun _ -> 
        url uri
    )

    "should have page title" &&& fun _ ->
        pageTitle == "Login"

let full () =
    context "Full Auth Assertions"
    once (fun _ -> 
        url uri
        pageTitle == "Login"
    )

    "should have an email label" &&& fun _ ->
        emailLabel == "Email"


let all () =
    smoke()
    full()