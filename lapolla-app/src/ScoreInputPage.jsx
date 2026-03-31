import React from 'react'
import './lapolla.css'
import GroupHeader from './GroupHeader';
import Matchday from './Matchday';
import groups from './Groups.json'

class ScoreImportPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            group: 'L'
        }
    }


    render() {
        const teams = groups[this.state.group];
        const match1Data = {
            matchNum: 1,
            team1: teams[0],
            team2: teams[1],
            matchTime: "1"
        } 

        return (
            <>
                <GroupHeader group={this.state.group} teams={teams}/>
                <Matchday teams={teams}/>
            </>
        )
    }
}

export default ScoreImportPage;