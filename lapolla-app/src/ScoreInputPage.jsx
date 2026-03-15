import React from 'react'
import './lapolla.css'
import GroupHeader from './GroupHeader';

const groups = {
    A: [
        'Mexico',
        'South Africa',
        'Korea Republic',
        'TBD'
    ],
    B: [
        'Canada',
        'TBD',
        'Qatar',
        'Switzerland'
    ],
    C: [
        'Brazil',
        'Morocco',
        'Haiti',
        'Scotland'
    ],
    D: [
        'USA',
        'Paraguay',
        'Australia',
        'TBD'
    ],
    E: [
        'Germany',
        'Curaçao',
        "Côte d'Ivoire",
        'Ecuador'
    ],
    F: [
        'Netherlands',
        'Japan',
        'TBD',
        'Tunisia'
    ],
    G: [
        'Belgium',
        'Egypt',
        'IR Iran',
        'New Zealand'
    ],
    H: [
        'Spain',
        'Cabo Verde',
        'Saudia Arabia',
        'Uruguay'
    ],
    I: [
        'France',
        'Senegal',
        'TBD',
        'Norway'
    ],
    J: [
        'Argentina',
        'Algeria',
        'Austria',
        'Jordan'
    ],
    K: [
        'Portugal',
        'TBD',
        'Uzbekistan',
        'Colombia'
    ],
    L: [
        'England',
        'Croatia',
        'Ghana',
        'Panama'
    ]
}

class ScoreImportPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            group: 'L'
        }
    }


    render() {
        return (
            <>
                <GroupHeader group={this.state.group} teams={groups[this.state.group]}/>
                <div>
                    <div>
                        a
                    </div>
                    <div>
                        a
                    </div>
                </div>
            </>
        )
    }
}

export default ScoreImportPage;