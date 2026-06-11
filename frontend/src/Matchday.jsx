import React from 'react'
import './lapolla.css'
import Match from './Match';

class Matchday extends React.Component {
    render() {
        const matchOrder = this.props.matchOrder;
        const teams = this.props.teams;
        const team1 = teams[matchOrder[0]];
        const team2 = teams[matchOrder[1]];
        const team3 = teams[matchOrder[2]];
        const team4 = teams[matchOrder[3]];

        // Matchday.jsx
        const match1Id = this.props.matchData[0].id;
        const match2Id = this.props.matchData[1].id;
        const preds = this.props.predictions;
        const match1Preds = preds[match1Id] || { home_score: null, away_score: null };
        const match2Preds = preds[match2Id] || { home_score: null, away_score: null };

        return (
            <>
                <Match
                    key={match1Id}
                    team1={team1}
                    team2={team2}
                    matchData={this.props.matchData[0]}
                    preds={match1Preds}
                    onEditScore={this.props.onEditScore}
                />
                <Match
                    key={match2Id}
                    team1={team3}
                    team2={team4}
                    matchData={this.props.matchData[1]}
                    preds={match2Preds}
                    onEditScore={this.props.onEditScore}
                />
            </>
        );
    }
}

export default Matchday;
