import React from 'react'
import './lapolla.css'
import GroupHeader from './GroupHeader';
import Matchday from './Matchday';
import groups from './Groups.json'
import matchesJSON from './Matches.json'
import teamsJSON from './Teams.json'
import SubmitConfirmation from './SubmitConfirmation';

const groupOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function getTeamsFromIds(teamIds) {
    var teams = [];
    teamIds.forEach(id => {
        teams.push(teamsJSON[id])
    });
    return teams;
}

class ScoreInputPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groupIndex: 0,
            showSubmitConfirmation: false,
            predictions: {},
            submitted: false
        }

        this.handleNextGroup = this.handleNextGroup.bind(this);
        this.handlePrevGroup = this.handlePrevGroup.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.showSubmitConfirmation = this.showSubmitConfirmation.bind(this);
        this.hideSubmitConfirmation = this.hideSubmitConfirmation.bind(this);
        this.editScore = this.editScore.bind(this);
        this.normalizePredictions = this.normalizePredictions.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/csrf/", {
            credentials: "include"
        });

        fetch(`http://localhost:8000/api/predict/?sheet_id=${this.props.sheetId}`, {
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            if (data.success === false) {
                window.location.hash = "#/";
                return;
            }

            const normalized = this.normalizePredictions(data.predictions);

            this.setState({
                predictions: normalized,
                submitted: data.submitted
            });
        });
    }


    normalizePredictions(predsFromServer) {
        const normalized = { ...predsFromServer };

        // Loop through ALL matches in ALL groups
        for (const group of groupOrder) {
            const matches = matchesJSON[group];
            for (const match of matches) {
                const id = match.id;
                if (!normalized[id]) {
                    normalized[id] = {
                        home_score: 0,
                        away_score: 0
                    };
                }
            }
        }

        return normalized;
    }

    handleNextGroup() {
        this.setState((prevState) => ({
            groupIndex: prevState.groupIndex + 1
        }));
    }

    handlePrevGroup() {
        this.setState((prevState) => ({
            groupIndex: prevState.groupIndex - 1
        }));
    }

    handleSave() {
        fetch("http://localhost:8000/api/predict/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken")
            },
            body: JSON.stringify({
                sheet_id: this.props.sheetId,
                predictions: this.state.predictions
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                window.location.hash = "sheets";
            } else {
                console.log("Failed to save. An error occurred.")
            }
        });
    }

    showSubmitConfirmation() {
        this.setState((prevState) => ({
            showSubmitConfirmation: true
        })); 
    }

    hideSubmitConfirmation() {
        this.setState((prevState) => ({
            showSubmitConfirmation: false
        })); 
    }

    editScore(id, home_score, away_score) {
        this.setState(prevState => ({
            predictions: {
                ...prevState.predictions,
                [id]: {
                    home_score: home_score ?? 0,
                    away_score: away_score ?? 0
                }
            }
        }));
    }

    render() {
        // Go to login if no user
        if (!this.props.user.authenticated)
            window.location.hash = "login";

        if (!this.props.sheetId || this.props.submitted)

        if (!this.state.predictions) {
            return <div>Loading...</div>;
        }

        const group = groupOrder[this.state.groupIndex];
        const teams = getTeamsFromIds(groups[group]);
        const matchData = matchesJSON[group];

        return (
            <>
                <GroupHeader group={group} teams={teams}/>

                <br className='large-hide'/>
                
                <Matchday teams={teams}
                          matchOrder={[0, 1, 2, 3]}
                          matchData={[matchData[0], matchData[1]]}
                          predictions={this.state.predictions}
                          onEditScore={this.editScore}/>
                <Matchday teams={teams}
                          matchOrder={[3, 1, 0, 2]}
                          matchData={[matchData[2], matchData[3]]}
                          predictions={this.state.predictions}
                          onEditScore={this.editScore}/>
                <Matchday teams={teams}
                          matchOrder={[3, 0, 1, 2]}
                          matchData={[matchData[4], matchData[5]]}
                          predictions={this.state.predictions}
                          onEditScore={this.editScore}/>

                <div className='center'>
                    {
                        this.state.groupIndex > 0 &&
                        <button onClick={() => this.handlePrevGroup()}>← Go to Group {groupOrder[this.state.groupIndex - 1]}</button>
                    }
                    {
                        this.state.groupIndex < groupOrder.length - 1 &&
                        <button onClick={() => this.handleNextGroup()}>Go to Group {groupOrder[this.state.groupIndex + 1]} →</button>
                    }
                </div>
                <div className='save-buttons center'>
                    <button onClick={() => this.handleSave()}>Save Scores</button>
                    <button onClick={() => this.showSubmitConfirmation()}>Submit Scores</button>
                </div>
                

                {this.state.showSubmitConfirmation && <SubmitConfirmation preds={this.state.predictions} onHide={this.hideSubmitConfirmation}/>}
            </>
        )
    }
}

export default ScoreInputPage;