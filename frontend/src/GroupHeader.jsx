import React from 'react'
import Team from './Team'
import './lapolla.css'

class GroupHeader extends React.Component {
    render() {
        return (
            <div className='group-header'>
                <div className='group-letter'>
                    Group
                    <h1>{this.props.group}</h1>
                </div>
                <div className='small-hide group-teams-outer-container center'>
                    <div className='group-teams-inner-container'>
                        {this.props.teams.map((team, index) => {
                            return(
                                <Team key={index} team={team}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default GroupHeader;