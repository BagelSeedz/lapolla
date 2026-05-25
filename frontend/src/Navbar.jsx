import React from "react";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            hamburger_open: false
        }

        this.goToHome = this.goToHome.bind(this);
        this.goToSheets = this.goToSheets.bind(this);
        this.goToRules = this.goToRules.bind(this);
        this.toggleHamburger = this.toggleHamburger.bind(this);
    }

    goToHome() {
        this.setState({hamburger_open: false})
        window.location.hash = "#/";
    }

    goToSheets() {
        this.setState({hamburger_open: false})
        window.location.hash = "sheets";
    }

    goToRules() {
        this.setState({hamburger_open: false})
        window.location.hash = "rules"
    }

    toggleHamburger() {
        this.setState({hamburger_open: !this.state.hamburger_open})
    }

    render() {
        return (
            <>
                <div className='navbar'>
                    <div className='center'>
                        <p>LaPolla</p>
                    </div>

                    <div className='center small-hide'>
                        <button onClick={this.goToHome}>Home</button>
                        <button onClick={this.goToSheets}>Sheets</button>
                        <button onClick={this.goToRules}>Rules</button>
                    </div>

                    <div className='center small-hide'>
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

                    <button className="large-hide" onClick={() => this.toggleHamburger()}>
                        Menu
                    </button>
                </div>

                {this.state.hamburger_open && <div className="hamburger_container center">
                    <div className="navbar">
                        <div>
                            <h1>LaPolla</h1>
                            <div style={{paddingBottom: '20px'}}><button onClick={this.goToHome}>Home</button></div>
                            <div style={{paddingBottom: '20px'}}><button onClick={this.goToSheets}>Sheets</button></div>
                            <div style={{paddingBottom: '30px'}}><button onClick={this.goToRules}>Rules</button></div>
                            {this.props.user.authenticated 
                                ? (
                                    <>
                                        <p>Hello {this.props.user.username}!</p>
                                        <button onClick={this.props.logout}>Log Out</button>
                                    </>
                                )
                                : (
                                    <>
                                        <div style={{paddingBottom: '30px'}}>
                                            <a onClick={() => this.toggleHamburger()} href="/#login">Log In</a>
                                        </div>
                                        <div>
                                            <a onClick={() => this.toggleHamburger()} href="/#register">Sign Up</a>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>}
            </>
        );
    }
}

export default Navbar;