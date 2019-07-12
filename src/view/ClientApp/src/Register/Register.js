import React, { Component } from 'react';

class Register extends Component {
    state = {
        errorMessages: [],
        form: {
            email: '',
            password: '',
        },
    };

    render() {
        return (
            <div>
                <h2>Register</h2>
                <div id="registration-validation-summary-error">
                    {this.state.errorMessages.map(message => (
                        <div key={message}>{message}</div>
                    ))}
                </div>
                <form
                    method="POST"
                    action="/api/Auth/register"
                    onSubmit={this.onSubmit}
                >
                    <label>Email</label>
                    <input
                        id="register-email"
                        type="text"
                        name="email"
                        onChange={this.handleInputChange}
                    />
                    <label>Password</label>
                    <input
                        id="register-password"
                        type="password"
                        name="password"
                        onChange={this.handleInputChange}
                    />
                    <button type="submit">Register</button>
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
            errorMessages: [],
        });
        const request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                // Should be (201) Created
                alert(this.responseText);
            }
            // On finish and not a successful/expected response
            if (this.readyState === 4 && this.status !== 200) {
                console.log(
                    'Error during registration',
                    JSON.parse(this.responseText)
                );
                const errorMessages = JSON.parse(this.responseText);
                component.setState({
                    errorMessages: errorMessages[''].map(message => message),
                });
            }
        };
        request.open('POST', '/api/Auth/register', true);
        request.setRequestHeader('Content-type', 'application/json');
        request.send(JSON.stringify(this.state.form));
    };
}

export default Register;
