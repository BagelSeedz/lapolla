import React from 'react'
import './lapolla.css'
import Match from './Match';

class Matchday extends React.Component {
    render() {
        return (
            <>
                <div className='center'>
                    <div className='matchday-title'>Matchday 1</div>
                </div>
                
                <Match/>
                <Match/>
            </>
        )
    }
}

export default Matchday;
