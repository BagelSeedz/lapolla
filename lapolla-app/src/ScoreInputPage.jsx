import React from 'react'
import './lapolla.css'
import GroupHeader from './GroupHeader';
import Matchday from './Matchday';
import groups from './Groups.json'
import matchesJSON from './Matches.json'

class ScoreImportPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            group: 'A'
        }
    }

    render() {
        const teams = groups[this.state.group];
        const matchData = matchesJSON[this.state.group];

        return (
            <>
                <GroupHeader group={this.state.group} teams={teams}/>
                <Matchday day={1}
                          teams={teams}
                          matchOrder={[0, 1, 2, 3]}
                          matchData={[matchData[0], matchData[1]]}/>
                <Matchday day={2}
                          teams={teams}
                          matchOrder={[3, 1, 0, 2]}
                          matchData={[matchData[2], matchData[3]]}/>
                <Matchday day={3}
                          teams={teams}
                          matchOrder={[3, 0, 1, 2]}
                          matchData={[matchData[4], matchData[5]]}/>
            </>
        )
    }
}

export default ScoreImportPage;