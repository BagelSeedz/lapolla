import React from 'react'
import axios from 'axios';
import './lapolla.css'
import GroupHeader from './GroupHeader';
import Matchday from './Matchday';
import groups from './Groups.json'
import matchesJSON from './Matches.json'
import SubmitConfirmation from './SubmitConfirmation';

const groupOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

class ScoreImportPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groupIndex: 0,
            showSubmitConfirmation: false
        }

        this.handleNextGroup = this.handleNextGroup.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit() {
        axios.post('http://127.0.0.1:8000/api/tasks/', {
            title: 'Test Tasking it',
            completed: true,
        }).then((response) => {
            console.log('Scores submitted successfully:', response.data);
        });
    }

    showSubmitConfirmation() {
        this.setState({ 
            groupIndex: this.state.groupIndex,
            showSubmitConfirmation: true 
        });
    }

    render() {
        const group = groupOrder[this.state.groupIndex];
        const teams = groups[group];
        const matchData = matchesJSON[group];

        return (
            <>
                <GroupHeader group={group} teams={teams}/>
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
                <div className='center'>
                    {
                        this.state.groupIndex > 0 &&
                        <button onClick={() => this.handlePrevGroup()}>← Go to Group {groupOrder[this.state.groupIndex - 1]}</button>
                    }
                    {
                        this.state.groupIndex < groupOrder.length - 1 ?
                        <button onClick={() => this.handleNextGroup()}>Go to Group {groupOrder[this.state.groupIndex + 1]} →</button> :
                        <button onClick={() => this.handleSubmit()}>Submit Scores</button>
                    }
                </div>
                <SubmitConfirmation/>
            </>
        )
    }
}

export default ScoreImportPage;