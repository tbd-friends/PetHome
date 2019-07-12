module Auth.Login

// #/Auth/Login
let uri = EnvProps.baseUri + "#/Auth/Login"

//selectors
let pageTitle = "#login-page h2"
let email = "#login-email"
let emailLabel = "label[for='login-email']"
let emailErrorMessage = "#login-email-error"
let password = "#login-password"
let passwordLabel = "label[for='login-password']"
let passwordErrorMessage = "#login-password-error"
let submitButton = "#login-button"
let loginPageTitle = "#login-page-title"
let errorMessage = "#login-validation-summary-error"

let registerNewUserLink = "#register-new-user-link"