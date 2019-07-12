import React, { Component } from 'react';

class Login extends Component {
    state = {
        errorMessage: '',
        form: {
            email: '',
            password: '',
        },
    };

    render() {
        return (
            <div id="login-page">
                <h2 id="login-page-title">Login</h2>
                <div id="login-validation-summary-error">
                    {this.state.errorMessage}
                </div>
                <form
                    method="POST"
                    action="/api/Auth/login"
                    onSubmit={this.onSubmit}
                >
                    <label htmlFor="login-email">Email</label>
                    <input
                        id="login-email"
                        type="text"
                        name="email"
                        required={true}
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="login-password">Password</label>
                    <input
                        id="login-password"
                        type="password"
                        name="password"
                        required={true}
                        onChange={this.handleInputChange}
                    />
                    <button id="login-button" type="submit">
                        Login
                    </button>
                </form>
            </div>
        );
    }

    handleInputChange = event => {
        const target = event.target;
        // Since checkbox stores value in different location on target, need to check for it.
        const value =
            target.type === 'checkbox' ? target.checked : target.value;
        // The name on the form input should be the same as the value we are going to send in the request.
        const name = target.name;

        this.setState({
            form: {
                // "Spread" the existing form data into the new form state.
                ...this.state.form,
                // Take the name and place the form value into state.
                [name]: value,
            },
        });
    };

    onSubmit = event => {
        event.preventDefault();
        // Save off component for usage in onReadyStateChange check
        const component = this;
        // Clear error message state, to help with the multiple requests.
        this.setState({
            errorMessage: '',
        });
        const request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            // On finish and status 200
            if (this.readyState === 4 && this.status === 200) {
                alert(this.responseText);
            }
            // On finish and not a successful/expected response
            if (this.readyState === 4 && this.status !== 200) {
                console.log('Error during registration', this.responseText);
                component.setState({
                    errorMessage: this.responseText,
                });
            }
        };
        request.open('POST', '/api/Auth/login', true);
        request.setRequestHeader('Content-type', 'application/json');
        request.send(JSON.stringify(this.state.form));
    };
}

export default Login;
