import React from 'react';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            error: null,
            loading: false
        }

        this.signup = this.signup.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/csrf/", {
            credentials: "include"
        });
    }

    signup(event) {
        event.preventDefault(); // stop page reload

        const formData = new FormData(event.target);
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirm-password")

        this.setState({ loading: true, error: null });

        if (password !== confirmPassword) {
            this.setState({ loading: false, error: "Passwords do not match." });
            return;
        }

        fetch("http://localhost:8000/api/register_user/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken")
            },
            body: JSON.stringify({ username, email, password })
        })
        .then(res => res.json())
        .then(data => {
            console.log("Server message:", data.message);
            this.setState({ loading: false });

            if (!data.success) {
                this.setState({ error: data.message });
            } else {
                this.setState({ error: null });
                window.location.hash = "#/";
            }
        })
        .catch(() => {
            this.setState({ loading: false, error: "An error occurred while signing up." });
        });
    }

    render() {
        return (
            <div className='full-height center login'>
                <div>
                    <h1>Sign Up</h1>
                    {this.state.error != null && <h3>Error: {this.state.error}</h3>}
                    <form onSubmit={this.signup}>
                        <h4>Username</h4>
                        <input name="username" type='text' placeholder='Username' />
                        <h4>Email</h4>
                        <input name="email" type='text' placeholder='Email' />
                        <h4>Password</h4>
                        <input name="password" type='password' placeholder='Password' />
                        <h4>Confirm Password</h4>
                        <input name="confirm-password" type='password' placeholder='Password' />
                        <button type="submit" disabled={this.state.loading}>Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUpPage;