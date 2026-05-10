import React from "react";
import './lapolla.css'

class Team extends React.Component {
    render() {
        const flag = this.props.team.flag;
        const name = this.props.team.name;
        const shortcut = this.props.team.shortcut;

        return (
            <div className='header-team center'>
                <img src={flag} alt={name + ' flag'} />
                <span className="small-hide">{name}</span>
                <span className="large-hide">{shortcut}</span>
            </div>
        )
    }
}

export default Team;