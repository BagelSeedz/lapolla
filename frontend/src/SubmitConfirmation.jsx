import React from 'react'

async function fetchCSRFToken() {
    const res = await fetch("https://api.lapolla2026.app/api/csrf/", {
        credentials: "include"
    });
    const data = await res.json();
    return data.csrfToken;
}

class SubmitConfirmation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: ""
        }

        this.updateCode = this.updateCode.bind(this);
    }

    updateCode(e) {
        this.setState({code: e.target.value})
    }

    async submit() {
        const code = this.state.code;

        if (!code || code.trim() === "") {
            alert("Please enter a code before submitting.");
            return;
        }

        // Save before submitting
        if (!this.props.skipSave) {
            const ok = await this.props.save();
            if (!ok) {
                alert("Save failed.");
                return;
            }
        }

        const csrfToken = await fetchCSRFToken();

        // Now submit
        fetch("https://api.lapolla2026.app/api/sheets/submit/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            },
            body: JSON.stringify({
                code: code,
                sheet_id: this.props.sheetId
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                this.props.onHide();
                
                if (this.props.onSubmitted) {
                    this.props.onSubmitted();
                } else {
                    // ⭐ Otherwise default to redirect (ScoreInputPage case)
                    window.location.hash = "sheets";
                }
            } else {
                alert(data.message || "Submission failed.");
            }
        })
        .catch(() => {
            alert("An error occurred while submitting.");
        });
    }


    render() {
        return (
            <div className="submit-confirmation center">
                <div>
                    <h1>Enter submission code</h1>
                    
                    <input 
                        className='score-input' 
                        placeholder='enter code'
                        onChange={this.updateCode}
                    />

                    <div className="center save-buttons">
                        <button onClick={() => this.props.onHide()}>Cancel</button>
                        <button className='small-hide' onClick={() => this.submit()}>Submit Scores</button>
                    </div>
                    <div className='center save-buttons large-hide'>
                        <button onClick={() => this.submit()}>Submit Scores</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubmitConfirmation;