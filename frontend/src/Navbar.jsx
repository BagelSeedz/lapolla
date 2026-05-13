import React from "react";

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.goToHome = this.goToHome.bind(this);
        this.goToSheets = this.goToSheets.bind(this);
        this.goToRules = this.goToRules.bind(this);
    }

    goToHome() {
        window.location.hash = "#/";
    }

    goToSheets() {
        window.location.hash = "sheets";
    }

    goToRules() {
        window.location.hash = "rules"
    }

    render() {
        return (
            <div className='navbar'>
                <div className='center small-hide'>
                    <p>LaPolla</p>
                </div>

                <div className='center'>
                    <button onClick={this.goToHome}>Home</button>
                    <button onClick={this.goToSheets}>Sheets</button>
                    <button onClick={this.goToRules}>Rules</button>
                </div>

                <div className='center'>
                    {this.props.user.authenticated 
                        ? (
                            <>
                                <p className="small-hide">Hello {this.props.user.username}!</p>
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