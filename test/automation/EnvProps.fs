module EnvProps

open System.IO
open Newtonsoft.Json


type TestingProps() =
    class
        member val BaseUri : string = "http://localhost:5000" with get, set
        member val Username : string = "test@user.pets" with get, set
        member val Password : string = "Password1!" with get, set
    end     

// Load in the values from file
let private propsFile = "./TestingProps.json"
let private testingProps =
    if File.Exists(propsFile) then
        JsonConvert.DeserializeObject<TestingProps>(File.ReadAllText(propsFile))
    else 
        TestingProps()


let baseUri = testingProps.BaseUri
let username = testingProps.Username
let password = testingProps.Password