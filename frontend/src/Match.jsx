import React from "react";
import Team from "./Team";

class Match extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            team1Score: 0,
            team2Score: 0
        };

        this.updateTeam1Score = this.updateTeam1Score.bind(this);
        this.updateTeam2Score = this.updateTeam2Score.bind(this);
    }

    updateTeam1Score(e) {
        const value = Number(e.target.value);

        this.setState(
            { team1Score: value },
            () => {
                this.props.onEditScore(
                    this.props.matchData.id,
                    this.state.team1Score,
                    this.state.team2Score
                );
            }
        );
    }

    updateTeam2Score(e) {
        const value = Number(e.target.value);

        this.setState(
            { team2Score: value },
            () => {
                this.props.onEditScore(
                    this.props.matchData.id,
                    this.state.team1Score,
                    this.state.team2Score
                );
            }
        );
    }

    render() {
        return (
            <div className='center matchdays-container'>
                <p className='matchdays-item'>{this.props.matchData.time}</p>

                <Team className='matchdays-item' team={this.props.team1}/>

                <input
                    className='matchdays-item score-input'
                    type="number"
                    value={this.state.team1Score}
                    onChange={this.updateTeam1Score}
                />

                <p>v</p>

                <input
                    className='matchdays-item score-input'
                    type="number"
                    value={this.state.team2Score}
                    onChange={this.updateTeam2Score}
                />

                <Team className='matchdays-item' team={this.props.team2}/>

                <p className='matchdays-item'>{this.props.matchData.place}</p>
            </div>
        );
    }
}

export default Match;