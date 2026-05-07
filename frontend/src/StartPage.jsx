import React from 'react';
import './lapolla.css'

class StartPage extends React.Component {
    render() {
        console.log(this.props.user);

        return (
            <div className='full-height center'>
                <button>
                    <a href='/#score-input'>Start Score Input</a>
                </button>
            </div>
        )
    }
}

export default StartPage;