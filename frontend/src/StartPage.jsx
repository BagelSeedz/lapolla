import React from 'react';
import './lapolla.css';

class StartPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstSheetId: null,
            firstSheetSubmitted: false,
            loadingSheets: false,
            submittedCount: 0,
        };

        this.handleStart = this.handleStart.bind(this);
    }

    componentDidMount() {
        // If user is logged in, fetch their sheets
        if (this.props.user.authenticated) {
            this.setState({ loadingSheets: true });

            fetch("http://localhost:8000/api/sheets/my/", {
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
        fetch("http://localhost:8000/api/sheets/count/")
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                this.setState({submittedCount: data.count})
            }
        })
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

    render() {
        return (
            <div className='full-height center'>
                <button onClick={this.handleStart}>
                    Start Score Input
                </button>
            </div>
        );
    }
}

export default StartPage;