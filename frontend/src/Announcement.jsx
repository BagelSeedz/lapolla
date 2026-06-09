import React from 'react';

async function fetchCSRFToken() {
    const res = await fetch("https://api.lapolla2026.app/api/csrf/", {
        credentials: "include"
    });
    const data = await res.json();
    return data.csrfToken;
}

class Announcement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            editMode: false,
            loading: true
        };

        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.saveAnnouncement = this.saveAnnouncement.bind(this);
    }

    componentDidMount() {
        fetch("https://api.lapolla2026.app/api/csrf/", {
            credentials: "include"
        });

        fetch("https://api.lapolla2026.app/api/announcement/", {
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                message: data.message || "",
                loading: false
            });
        });
    }

    toggleEdit() {
        this.setState(prev => ({ editMode: !prev.editMode }));
    }

    handleInput(e) {
        this.setState({ message: e.target.value });
    }

    async saveAnnouncement() {
        const csrfToken = await fetchCSRFToken();

        const res = await fetch("https://api.lapolla2026.app/api/announcement/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            },
            body: JSON.stringify({
                message: this.state.message
            })
        });

        const data = await res.json();

        if (data.success) {
            this.setState({ editMode: false });
        }
    }

    render() {
        const is_staff = this.props.user.is_staff;

        if (this.state.loading) {
            return <div className="center"><p>Loading announcement...</p></div>;
        }

        return (
            <div className="center">
                <div style={{ width: "90%", maxWidth: "600px" }}>
                    <h1 style={{ textAlign: "center" }}>Announcement</h1>

                    {/* VIEW MODE */}
                    {!this.state.editMode && (
                        <p style={{ textAlign: "center", whiteSpace: "pre-wrap" }}>
                            {this.state.message || "No announcement posted."}
                        </p>
                    )}

                    {/* EDIT MODE */}
                    {this.state.editMode && (
                        <textarea
                            value={this.state.message}
                            onChange={this.handleInput}
                            style={{
                                width: "100%",
                                height: "150px",
                                fontSize: "1.1rem",
                                padding: "10px",
                                borderRadius: "8px"
                            }}
                        />
                    )}

                    {/* STAFF CONTROLS */}
                    {is_staff && (
                        <div className="center" style={{ marginTop: "20px" }}>
                            {!this.state.editMode && (
                                <button onClick={this.toggleEdit}>
                                    Edit Announcement
                                </button>
                            )}

                            {this.state.editMode && (
                                <>
                                    <button onClick={this.saveAnnouncement}>
                                        Save
                                    </button>
                                    <button onClick={this.toggleEdit}>
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Announcement;