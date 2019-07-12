module Logout.Flows

open canopy.classic

let logoutOfApplication () =
    url Auth.Logout.uri
    try 
        elementWithText Auth.Logout.submitButton "Yes" |> ignore;
        printfn "User was found, logging out."
        click Auth.Logout.submitButton
    with
        | _ -> printfn "No user logged in."