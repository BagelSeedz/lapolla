import React from 'react'
import './lapolla.css'
import Match from './Match';

class Matchday extends React.Component {
    render() {
        const day = this.props.day;
        const matchOrder = this.props.matchOrder;
        const teams = this.props.teams;
        const team1 = teams[matchOrder[0]];
        const team2 = teams[matchOrder[1]];
        const team3 = teams[matchOrder[2]];
        const team4 = teams[matchOrder[3]];

        return (
            <>
                <div className='center'>
                    <div className='matchday-title'>Matchday {day}</div>
                </div>
                
                <Match team1={team1}
                       team2={team2}
                       matchData={this.props.matchData[0]}
                       onEditScore={this.props.onEditScore}/>
                <Match team1={team3}
                       team2={team4}
                       matchData={this.props.matchData[1]}
                       onEditScore={this.props.onEditScore}/>
            </>
        )
    }
}

export default Matchday;
