import React from "react";
import Team from "./Team";

class Match extends React.Component {
    constructor(props) {
        super(props);

        this.sanitize = this.sanitize.bind(this);
        this.updateTeam1Score = this.updateTeam1Score.bind(this);
        this.updateTeam2Score = this.updateTeam2Score.bind(this);
    }

    sanitize(value) {
        const num = parseInt(value, 10);
        return isNaN(num) ? 0 : num;
    }

    updateTeam1Score(e) {
        const value = this.sanitize(e.target.value);

        this.props.onEditScore(
            this.props.matchData.id,
            value,
            this.props.preds.away_score
        );
    }

    updateTeam2Score(e) {
        const value = this.sanitize(e.target.value);

        this.props.onEditScore(
            this.props.matchData.id,
            this.props.preds.home_score,
            value
        );
    }

    render() {
        const preds = this.props.preds || { home_score: 0, away_score: 0 };

        return (
            <>
                <div className="center">
                    <p className="large-hide no-margin">{this.props.matchData.time}</p>
                </div>
                
                <div className='matchdays-container'>
                    <p className="small-hide">{this.props.matchData.id}</p>

                    <p className="small-hide">{this.props.matchData.time}</p>

                    <Team team={this.props.team1}/>

                    <input
                        className='score-input'
                        type="text"
                        value={preds.home_score}
                        onChange={this.updateTeam1Score}
                    />

                    <p className="versus">v</p>

                    <input
                        className='score-input'
                        type="text"
                        value={preds.away_score}
                        onChange={this.updateTeam2Score}
                    />

                    <Team team={this.props.team2}/>

                    <p className="small-hide">{this.props.matchData.place}</p>
                </div>
            </>
        );
    }
}

export default Match;