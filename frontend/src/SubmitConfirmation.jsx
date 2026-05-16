import React from 'react'

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
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

    submit() {
        const preds = this.props.preds;

        console.log(this.state.code)
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