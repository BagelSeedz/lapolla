import React from 'react'
import Team from './Team';

class Match extends React.Component {
    render() {
        return (
            <div className='center matchdays-container'>
                <p className='matchdays-item'>11 June 15:00</p>
                <Team className='matchdays-item' team="Team 1"/>
                <input className='matchdays-item score-input'/>
                <p>v</p>
                <input className='matchdays-item score-input'/>
                <Team className='matchdays-item' team="Team 2"/>
                <p className='matchdays-item'>Mexico City</p>
            </div>
        )
    }
}

export default Match;