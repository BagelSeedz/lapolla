import React from "react";
import Team from "./Team";

class Match extends React.Component {
    constructor(props) {
        super(props);

        this.updateTeam1Score = this.updateTeam1Score.bind(this);
        this.updateTeam2Score = this.updateTeam2Score.bind(this);
    }

    updateTeam1Score(e) {
        const value = Number(e.target.value);

        this.props.onEditScore(
            this.props.matchData.id,
            value,
            this.props.preds.away_score
        );
    }

    updateTeam2Score(e) {
        const value = Number(e.target.value);

        this.props.onEditScore(
            this.props.matchData.id,
            this.props.preds.home_score,
            value
        );
    }

    render() {
        const preds = this.props.preds || { home_score: 0, away_score: 0 };

        return (
            <div className='center matchdays-container'>
                <p className='matchdays-item'>{this.props.matchData.time}</p>

                <Team className='matchdays-item' team={this.props.team1}/>

                <input
                    className='matchdays-item score-input'
                    type="number"
                    value={preds.home_score}
                    onChange={this.updateTeam1Score}
                />

                <p>v</p>

                <input
                    className='matchdays-item score-input'
                    type="number"
                    value={preds.away_score}
                    onChange={this.updateTeam2Score}
                />

                <Team className='matchdays-item' team={this.props.team2}/>

                <p className='matchdays-item'>{this.props.matchData.place}</p>
            </div>
        );
    }
}

export default Match;