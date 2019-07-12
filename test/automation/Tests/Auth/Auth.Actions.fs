module Auth.Actions

open canopy.classic
open canopy.runner.classic

let smoke () =
    context "Smoke Auth.Login Actions"
    before (fun _ -> 
        Logout.Flows.logoutOfApplication()
        url Auth.Login.uri 
    )

    "submit form" &&& fun _ ->
        Auth.Login.email << EnvProps.username
        Auth.Login.password << EnvProps.password
        click Auth.Login.submitButton
        Home.Index.pageTitle == "Welcome to Pet Home"

let full () =
    context "Full Auth.Login Actions"
    before (fun _ -> 
        Logout.Flows.logoutOfApplication()
        url Auth.Login.uri 
    )

    "should land on home page when login is successful" &&& fun _ -> 
        Login.Flows.loginToApplication EnvProps.username EnvProps.password
        acceptAlert()
        Home.Index.pageTitle == "Welcome to Pet Home"

    "clearing #username sets text to new empty string via IWebElement" &&& fun _ ->
        element Auth.Login.email |> clear
        Auth.Login.email == ""

    "should land on home page when login is successful" &&& fun _ -> 
        Login.Flows.loginToApplication EnvProps.username EnvProps.password
        acceptAlert()
        Home.Index.pageTitle == "Welcome to Pet Home"

    "should show error message on login page when username is invalid email" &&! fun _ -> 
        Login.Flows.loginToApplication "invalid username" EnvProps.password
        Auth.Login.emailErrorMessage == "Invalid username or password"
        
    "should show error message on login page when password is invalid" &&& fun _ -> 
        Login.Flows.loginToApplication EnvProps.username "invalid password"
        Auth.Login.errorMessage == "Invalid username or password"
        
    "should show password error message when password is empty" &&! fun _ -> 
        Login.Flows.loginToApplication EnvProps.username ""
        Auth.Login.passwordErrorMessage == "The Password field is required."
        
    "should show Email error message when username is empty" &&! fun _ -> 
        Login.Flows.loginToApplication "" "not empty"
        Auth.Login.emailErrorMessage == "The Email field is required."
        
    "should show Email and Password error message when both are empty" &&! fun _ -> 
        Login.Flows.loginToApplication "" ""
        Auth.Login.emailErrorMessage == "The Email field is required."
        Auth.Login.passwordErrorMessage == "The Password field is required."

    "clearing #username sets text to new empty string via IWebElement" &&& fun _ ->
        element Auth.Login.email |> clear
        Auth.Login.email == ""

let edge () =
  context "Edge Auth.Login Actions"
  before (fun _ -> url Home.Index.uri)

  "should show error message when trying to login with empty password" &&! fun _ ->
        Login.Flows.loginToApplication EnvProps.username ""
        Auth.Login.passwordErrorMessage == "The Password field is required."

let all () =
    smoke()
    full()
    edge()