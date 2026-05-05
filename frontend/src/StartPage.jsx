import React from 'react';
import './lapolla.css'

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

class StartPage extends React.Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/csrf/", {
            credentials: "include"
        });
    }

    logout() {
        fetch("http://localhost:8000/api/logout_user/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken")
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // Tell App to refresh user state
                this.props.onLogout().then(() => {
                    window.location.hash = "#/";
                });
            } else {
                console.log("Failed to log out. An error occurred.")
            }
        });
    }

    render() {
        console.log(this.props.user);

        return (
            <>
                <div className='navbar'>
                    {this.props.user.authenticated 
                        ? (
                            <>
                                <p>Hello {this.props.user.username}!</p>
                                <button onClick={this.logout}>Log Out</button>
                            </>
                        )
                        : (
                            <>
                                <a href="/#login">Log In</a>
                                <a href="/#register">Sign Up</a>
                            </>
                        )
                    }
                </div>
                <div className='full-height center'>
                    <button>
                        <a href='/#score-input'>Start Score Input</a>
                    </button>
                </div>
            </>
        )
    }
}

export default StartPage;