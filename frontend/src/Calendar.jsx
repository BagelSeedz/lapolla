import React from 'react';
import matches from './Matches.json';
import teams from './Teams.json';
import matchTeamIds from '../MatchTeamIds.json';
import Match from './Match';

export function getTeamsForMatch(matchId) {
    const entry = matchTeamIds[matchId];

    if (!entry) {
        console.error("Missing team IDs for match:", matchId);
        return { team1: null, team2: null };
    }

    const team1 = teams[entry.team1_id];
    const team2 = teams[entry.team2_id];

    return { team1, team2 };
}


class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scores: {},
            loading: true,
            saving: false,
            flatMatches: []
        };

        this.onEditScore = this.onEditScore.bind(this);
        this.saveAllScores = this.saveAllScores.bind(this);
    }

    componentDidMount() {
        fetch("https://api.lapolla2026.app/api/csrf/", {
            credentials: "include"
        });

        fetch("https://api.lapolla2026.app/api/scores/", {
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            const flat = this.flattenAndSortMatches(matches);

            this.setState({
                scores: data.scores,
                flatMatches: flat,
                loading: false
            });
        });
    }

    // -----------------------------
    // Flatten Matches.json into a single sorted list
    // -----------------------------
    flattenAndSortMatches(matchesJson) {
        let list = [];

        for (const group in matchesJson) {
            for (const m of matchesJson[group]) {
                list.push({
                    ...m,
                    group: group
                });
            }
        }

        list.sort((a, b) => {
            const da = new Date(a.time + " 2026");
            const db = new Date(b.time + " 2026");
            return da - db;
        });

        return list;
    }

    // -----------------------------
    // Staff edits a score
    // -----------------------------
    onEditScore(matchId, home, away) {
        this.setState(prev => ({
            scores: {
                ...prev.scores,
                [matchId]: {
                    home_score: home,
                    away_score: away
                }
            }
        }));
    }

    // -----------------------------
    // STAFF ONLY: Save all scores
    // -----------------------------
    async saveAllScores() {
        this.setState({ saving: true });

        // Fetch CSRF token
        const csrfRes = await fetch("https://api.lapolla2026.app/api/csrf/", {
            credentials: "include"
        });
        const csrfData = await csrfRes.json();
        const csrfToken = csrfData.csrfToken;

        const res = await fetch("https://api.lapolla2026.app/api/scores/", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            },
            body: JSON.stringify({
                scores: this.state.scores
            })
        });

        const data = await res.json();

        this.setState({ saving: false });

        if (data.success) {
            alert("Scores saved successfully");
        } else {
            alert("Failed to save scores");
        }
    }

    render() {
        const is_staff = this.props.user.is_staff;

        if (this.state.loading) {
            return <div className="center"><p>Loading calendar...</p></div>;
        }

        return (
            <div className="calendar-container">
                
                {/* STAFF ONLY SAVE BUTTON */}
                {is_staff && (
                    <div className="center" style={{ marginTop: "30px" }}>
                        <button onClick={this.saveAllScores} disabled={this.state.saving}>
                            {this.state.saving ? "Saving..." : "Save All Scores"}
                        </button>
                    </div>
                )}

                {this.state.flatMatches.map(match => {
                    const matchId = match.id;

                    const preds = this.state.scores[matchId] || {
                        home_score: "",
                        away_score: ""
                    };

                    const { team1, team2 } = getTeamsForMatch(matchId);

                    return (
                        <Match
                            key={matchId}
                            team1={team1}
                            team2={team2}
                            matchData={match}
                            preds={preds}
                            editable={is_staff}
                            onEditScore={(h, a) => is_staff && this.onEditScore(matchId, h, a)}
                        />
                    );
                })}

                {/* STAFF ONLY SAVE BUTTON */}
                {is_staff && (
                    <div className="center" style={{ marginTop: "30px" }}>
                        <button onClick={this.saveAllScores} disabled={this.state.saving}>
                            {this.state.saving ? "Saving..." : "Save All Scores"}
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default Calendar;