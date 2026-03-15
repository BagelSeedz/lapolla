import React from "react";
import './lapolla.css'

class Team extends React.Component {
    render() {
        return (
            <div className='header-team'>
                <img src={'flags/' + this.props.team + '.png'} alt={this.props.team + ' flag'}/>
                {this.props.team}
            </div>
        )
    }
}

export default Team;