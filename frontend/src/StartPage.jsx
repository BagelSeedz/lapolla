import React from 'react';
import './lapolla.css'

class StartPage extends React.Component {
    render() {
        console.log(this.props.user);

        return (
            <>
                <div className='navbar'>
                    <a href="/#login">Login</a>
                    <a href="/#register">Register</a>
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