import React from 'react';
import './SheetsPage.css';

async function fetchCSRFToken() {
    const res = await fetch("https://api.lapolla2026.app/api/csrf/", {
        credentials: "include"
    });
    const data = await res.json();
    return data.csrfToken;
}

class SheetsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mySheets: [],
            otherSheets: [],
            showSubmitConfirmation: false,
            submittingSheetId: null
        };

        this.createSheet = this.createSheet.bind(this);
        this.goToEditSheet = this.goToEditSheet.bind(this);
        this.unsubmit = this.unsubmit.bind(this);
        this.markSubmitted = this.markSubmitted.bind(this);
        this.viewSheet = this.viewSheet.bind(this);
    }
    
    componentDidMount() {
        fetch("https://api.lapolla2026.app/api/csrf/", { credentials: "include" });

        // Load My Sheets
        fetch("https://api.lapolla2026.app/api/sheets/my/", {
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                this.setState({ mySheets: data.sheets });
            }
        });

        // Load Other Sheets
        fetch("https://api.lapolla2026.app/api/sheets/other/", {
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                this.setState({ otherSheets: data.sheets });
            }
        });
    }

    goToEditSheet(sheetId) {
        window.location.hash = `score-input?sheet_id=${sheetId}`;
    }

    async createSheet() {
        if (!this.props.user.authenticated)
            window.location.hash = "login";

        const csrfToken = await fetchCSRFToken();

        fetch("https://api.lapolla2026.app/api/sheets/create/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const newSheet = data.sheet;

                // Add to state
                this.setState(prev => ({
                    mySheets: [...prev.mySheets, newSheet]
                }));

                // Redirect to edit page
                this.goToEditSheet(newSheet.id);
            }
        });
    }

    async unsubmit(sheetId) {
        const csrfToken = await fetchCSRFToken();

        fetch("https://api.lapolla2026.app/api/sheets/unsubmit/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            },
            body: JSON.stringify({
                sheet_id: sheetId
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // Update UI: mark sheet as unsubmitted
                this.setState(prev => ({
                    mySheets: prev.mySheets.map(s =>
                        s.id === sheetId ? { ...s, submitted: false} : s
                    )
                }));
            } else {
                alert(data.message || "Unsubmit failed.");
            }
        })
        .catch(() => {
            alert("An error occurred while unsubmitting.");
        });
    }

    markSubmitted(sheetId) {
        this.setState(prev => ({
            mySheets: prev.mySheets.map(s =>
                s.id === sheetId ? { ...s, submitted: true} : s
            )
        }));
    }

    viewSheet(sheetId) {
        // Opens the export URL in a new tab and triggers download
        window.open(`https://api.lapolla2026.app/api/sheets/export/${sheetId}/`, "_blank");
    }

    render() {
        return (
            <>
                <div className="sheets-page">
                    <div className="sheets-container">

                        <h2 className="section-title">My Sheets</h2>

                        <div className="sheet-list">
                            {this.state.mySheets.map((sheet) => (
                                <Sheet
                                    key={sheet.id}
                                    sheet={sheet}
                                    mine={true}
                                    onEdit={this.goToEditSheet}
                                    onUnsubmit={(id) => this.unsubmit(id)}
                                    onView={(id) => this.viewSheet(id)}
                                />
                            ))}
                        </div>
                        
                        {this.state.mySheets.length < 2 && <button className="add-sheet-button" onClick={this.createSheet}>+</button>}
                        
                        <h1>_________________</h1>

                        <h2 className="section-title other-title">Other Sheets</h2>

                        <div className="sheet-list">
                            {this.state.otherSheets.map((sheet) => (
                                <Sheet
                                    key={sheet.id}
                                    sheet={sheet}
                                    mine={false}
                                    onView={(id) => this.viewSheet(id)}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

class Sheet extends React.Component {
    render() {
        const { sheet, mine } = this.props;

        return (
            <div className="sheet-card">

                <div className="sheet-info">
                    <p>
                        <span className="label">Owner:</span> {sheet.owner}
                    </p>

                    <p>
                        <span className="label">Rank:</span> {sheet.rank}
                    </p>

                    {mine && sheet.submitted && (
                        <button
                            className='sheet-button'
                            onClick={() => this.props.onUnsubmit(sheet.id)}
                        >
                            Unsubmit
                        </button>
                    )}
                </div>

                <div className="sheet-actions">
                    <button 
                        className="sheet-button"
                        onClick={() => this.props.onView(sheet.id)}
                    >
                        View
                    </button>


                    {mine && !sheet.submitted && (
                        <button
                            className="sheet-button"
                            onClick={() => this.props.onEdit(sheet.id)}
                        >
                            Edit
                        </button>
                    )}
                </div>

                <div className="sheet-id">#{sheet.id}</div>

            </div>
        );
    }
}

export default SheetsPage;