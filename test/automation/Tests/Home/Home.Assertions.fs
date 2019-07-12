module Home.Assertions

open canopy.classic
open canopy.runner.classic
open Home.Index

let smoke () =
  context "Smoke Home Assertions"
  before (fun _ -> url Home.Index.uri)

  ".navbar-brand should have Pet Home" &&! fun _ ->
    navBarTitle == "Pet Home"

let full () =
  context "Full Home Assertions"
  before (fun _ -> url Home.Index.uri)

  ".home-page-title should have Welcome to Pet Home" &&& fun _ ->
    pageTitle == pageTitleText



let all () =
  smoke()
  full()