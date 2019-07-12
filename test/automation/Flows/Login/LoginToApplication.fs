module Login.Flows

open canopy.classic

let loginToApplication username password =
    url Auth.Login.uri
    Auth.Login.email << username
    Auth.Login.password << password
    click Auth.Login.submitButton