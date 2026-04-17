import React from 'react';
import './lapolla.css'

class StartPage extends React.Component {
    render() {
        console.log(this.props.user);

        return (
            <>
                <div className='navbar'>
                    <a href="http://127.0.0.1:8000/api/login_user">Login</a>
                    <a href="http://127.0.0.1:8000/api/register_user">Register</a>
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