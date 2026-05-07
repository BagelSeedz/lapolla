import React from "react";

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.goToHome = this.goToHome.bind(this);
        this.goToScoreInput = this.goToScoreInput.bind(this);
    }

    goToHome() {
        window.location.hash = "#/";
    }

    goToScoreInput() {
        window.location.hash = "score-input";
    }

    render() {
        return (
            <div className='navbar'>
                <div className='center'>
                    <p>LaPolla</p>
                </div>
                <div className='center'>
                    <button onClick={this.goToHome}>Home</button>
                    <button onClick={this.goToScoreInput}>Score Input</button>
                </div>
                <div className='center'>
                    {this.props.user.authenticated 
                        ? (
                            <>
                                <p>Hello {this.props.user.username}!</p>
                                <button onClick={this.props.logout}>Log Out</button>
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
            </div>
        );
    }
}

export default Navbar;