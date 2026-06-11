import React from 'react';
import './lapolla.css';
import groups from './Groups.json'
import teamsJSON from './Teams.json'
import Announcement from './Announcement';
import Calendar from './Calendar';

function getTeamsFromIds(teamIds) {
    var teams = [];
    teamIds.forEach(id => {
        teams.push(teamsJSON[id])
    });
    return teams;
}

class StartPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstSheetId: null,
            firstSheetSubmitted: false,
            loadingSheets: false,
            submittedCount: 0,
            animatedPrize: 0,
        };

        this.prizeRef = React.createRef();

        this.handleStart = this.handleStart.bind(this);
        this.animatePrize = this.animatePrize.bind(this);
    }

    componentDidMount() {
        // If user is logged in, fetch their sheets
        if (this.props.user.authenticated) {
            this.setState({ loadingSheets: true });

            fetch("https://api.lapolla2026.app/api/sheets/my/", {
                credentials: "include"
            })
            .then(res => res.json())
            .then(data => {
                if (data.success && data.sheets.length > 0) {
                    this.setState({ 
                        firstSheetId: data.sheets[0].id,
                        firstSheetSubmitted: data.sheets[0].submitted
                    });
                }
            })
            .finally(() => {
                this.setState({ loadingSheets: false });
            });
        }

        // Submitted count
        fetch("https://api.lapolla2026.app/api/sheets/count/")
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                this.setState({submittedCount: data.count})
            }
        })

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    this.animatePrize();
                    observer.disconnect(); // run only once
                }
            },
            { threshold: 0.5 }
        );

        if (this.prizeRef.current) {
            observer.observe(this.prizeRef.current);
        }
    }

    handleStart() {
        if (!this.props.user.authenticated) {
            // Not logged in → go to login page
            window.location.hash = "#/login";
            return;
        }

        if (this.state.firstSheetSubmitted) {
            window.location.hash = "sheets"
            return;
        }

        if (this.state.firstSheetId) {
            // Logged in → go to first sheet
            window.location.hash = `#/score-input?sheet_id=${this.state.firstSheetId}`;
            return;
        }
    }

    animatePrize() {
        const target = this.state.submittedCount * 20;
        const duration = 1200; // ms
        const start = performance.now();

        const step = (timestamp) => {
            const progress = Math.min((timestamp - start) / duration, 1);
            const value = Math.floor(progress * target);

            this.setState({ animatedPrize: value });

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }

    render() {
        return (
            <>
                <div className="start-page-wrapper center">
                    <div className='start-column small-hide small-height-hide'>
                        <div className='full-height center'>
                            <div>
                                <Group letter='A' color='limegreen'/>
                                <Group letter='B' color='red'/>
                                <Group letter='C' color='yellow'/>
                            </div>
                            <div>
                                <Group letter='D' color='DodgerBlue'/>
                                <Group letter='E' color='orange'/>
                                <Group letter='F' color='Gray'/>
                            </div>
                        </div>
                    </div>
                    <div className='start-column'>
                        <div className='full-height center'>
                            <div>
                                <div className='center large-hide' style={{textAlign: 'center'}}>
                                    <h1>LaPolla</h1>
                                    <h2 style={{paddingBottom: '50%'}}>FIFA World Cup 2026</h2>
                                </div>
                                {/* <button 
                                    style={{minWidth: '200px'}}
                                    onClick={this.handleStart}>
                                    Start Score Input
                                </button> */}
                            </div>
                            
                        </div>
                    </div>
                    <div className='start-column small-hide small-height-hide'>
                        <div className='full-height center'>
                            <div>
                                <Group letter='G' color='plum'/>
                                <Group letter='H' color='cyan'/>
                                <Group letter='I' color='purple'/>
                            </div>
                            <div>
                                <Group letter='J' color='DarkRed'/>
                                <Group letter='K' color='magenta'/>
                                <Group letter='L' color='#BA55D3'/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='prize-pool-container' ref={this.prizeRef}>
                    <div className='full-height center'>
                        <div>
                            <h1>Prize Pool</h1>
                            <h1 style={{color: 'green'}}>${this.state.animatedPrize}</h1>
                            <h2>Sheets submitted: {this.state.submittedCount}</h2>
                        </div>
                    </div>
                </div>

                <Announcement user={this.props.user}/>

                <div className='large-hide center'>
                    <h1 style={{textAlign: 'center'}}>Groups</h1>
                    <div className='center'>
                        <Group letter='A' color='limegreen'/>
                        <Group letter='B' color='red'/>
                    </div>
                    <div className='center'>
                        <Group letter='C' color='yellow'/>
                        <Group letter='D' color='DodgerBlue'/>
                    </div>
                    <div className='center'>
                        <Group letter='E' color='orange'/>
                        <Group letter='F' color='Gray'/>
                    </div>
                    <div className='center'>
                        <Group letter='G' color='plum'/>
                        <Group letter='H' color='cyan'/>
                    </div>
                    <div className='center'>
                        <Group letter='I' color='purple'/>
                        <Group letter='J' color='DarkRed'/>
                    </div>
                    <div className='center'>
                        <Group letter='K' color='magenta'/>
                        <Group letter='L' color='#BA55D3'/>
                    </div>
                </div>
                
                <div className='center'>
                    <div>
                        <Calendar user={this.props.user}/>
                    </div>
                </div>
            </>
        );
    }
}


class Group extends React.Component {
    render() {
        const teams = getTeamsFromIds(groups[this.props.letter]);

        return(
            <div className='start-group' style={{border: '5px solid ' + this.props.color}}>
                <p style={{textAlign: 'center', fontWeight: 'bolder'}}>Group {this.props.letter}</p>
                <p style={{marginLeft: '10px'}}>
                    <img 
                        src={teams[0].flag}
                        alt={teams[0].name + " flag"}
                        className="team-flag" 
                    /> 
                    {teams[0].name}
                </p>
                <p style={{marginLeft: '10px'}}>
                    <img 
                        src={teams[1].flag} 
                        alt={teams[1].name + " flag"}
                        className="team-flag" 
                    /> 
                    {teams[1].name}
                </p>
                <p style={{marginLeft: '10px'}}>
                    <img 
                        src={teams[2].flag} 
                        alt={teams[2].name + " flag"}
                        className="team-flag" 
                    /> 
                    {teams[2].name}
                </p>
                <p style={{marginLeft: '10px'}}>
                    <img 
                        src={teams[3].flag} 
                        alt={teams[3].name + " flag"}
                        className="team-flag" 
                    /> 
                    {teams[3].name}
                </p>
            </div>
        );
    }
}


export default StartPage;