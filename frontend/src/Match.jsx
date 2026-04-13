import React from 'react'
import Team from './Team';

class Match extends React.Component {
    render() {
        return (
            <div className='center matchdays-container'>
                <p className='matchdays-item'>{this.props.matchData.time}</p>
                <Team className='matchdays-item' team={this.props.team1}/>
                <input className='matchdays-item score-input'/>
                <p>v</p>
                <input className='matchdays-item score-input'/>
                <Team className='matchdays-item' team={this.props.team2}/>
                <p className='matchdays-item'>{this.props.matchData.place}</p>
            </div>
        )
    }
}

export default Match;