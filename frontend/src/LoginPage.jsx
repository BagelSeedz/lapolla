import React from 'react';
import { redirect } from 'react-router-dom';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            error: null,
            loading: false
        }

        this.login = this.login.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/csrf/", {
            credentials: "include"
        });
    }

    login(formData) {
        const { email, password } = formData;
        this.setState({ loading: true, error: null });

        fetch("http://localhost:8000/api/login_user/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken")
            },
            body: JSON.stringify({ "email": email, "password": password })
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ loading: false });
            if (!data.success) {
                this.setState({ error: data.message });
            } else {
                this.setState({ error: null });
                redirect("/");
            }
        })
        .catch(error => {
            this.setState({ loading: false, error: "An error occurred while logging in." });
        });
    }

    render() {
        return (
            <div className='full-height center login'>
                <div>
                    <h1>Log In</h1>
                    {this.state.error != null && <h3>Error: {this.state.error}</h3>}
                    <form action={this.login}>
                        <h4>Email</h4>
                        <input name="email" type='text' placeholder='Email' />
                        <h4>Password</h4>
                        <input name="password" type='password' placeholder='Password' />
                        <button type="submit">Log In</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginPage;