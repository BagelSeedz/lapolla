import React from 'react'

class SubmitConfirmation extends React.Component {
    render() {
        return (
            <div className="submit-confirmation center">
                <div>
                    <h1>Are you sure you want to submit your scores?</h1>
                    <p>You can still edit your scores before June 11, when the tournament begins.</p>
                    <div className="center">
                        <button onClick={() => window.location.reload()}>Cancel</button>
                        <button onClick={() => window.location.reload()}>Submit Scores</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubmitConfirmation;