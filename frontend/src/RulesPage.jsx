import React from "react";

class RulesPage extends React.Component {
    render() {
        return (
            <div>
                <h1>WORLD CUP 2026 – GROUP STAGE POLLA (POOL)</h1>
                <h2>Official Rules & Regulations</h2>
                <h1>⸻</h1>
                <Rule title="1. Entry & Participation">
                    {`
                        Entry fee: $20 per entry
                        Administrative fee: $2 per entry (covers printing and management costs)
                        Maximum of two (2) entries per person
                        No refunds will be issued after the submission deadline
                        An entry is only considered valid once:

                        Payment is completed, and a full set of predictions is submitted
                    `}
                </Rule>
                <h1>⸻</h1>
                <Rule title="2. Match Coverage">
                    {`
                        This pool covers only all group stage matches of the FIFA World Cup 2026
                        All entries must be complete and clearly written
                        Any missing, unclear, or illegible predictions will receive 0 points for those matches
                    `}
                </Rule>
                <h1>⸻</h1>
                <Rule title="3. Submission Deadline">
                    {`
                        All entries must be submitted on or before June 8 (end of day)
                        Participants may submit entries earlier if desired
                        Completed prediction packages will be distributed between June 9 and June 10
                        No late entries will be accepted under any circumstances
                    `}
                </Rule>
                <h1>⸻</h1>
                <Rule title="4. Finality of Entries">
                    {`
                        Once submitted and included in the distributed packages, all predictions are final
                        No changes, edits, or corrections are allowed after submission
                    `}
                </Rule>
                <h1>⸻</h1>
                <Rule title="5. Submission Format">
                    {`
                        Predictions must be written on the official form
                        All scores must be clearly legible
                        Example: a “7” must be clearly distinguishable from a “1”
                        Any unclear or ambiguous number will be considered invalid and scored as 0 points
                    `}
                </Rule>
                <h1>⸻</h1>
                <Rule title="6. Official Results Source">
                    {`
                        All official match results will be based exclusively on the final scores published on the official FIFA website
                    `}
                </Rule>
                <h1>⸻</h1>
                <Rule title="7. Scoring System">
                    {`
                        For each match:

                        3 points – Exact score prediction
                        1 point – Correct match outcome (correct winner or correctly predicted draw, but wrong score)
                        0 points – Incorrect outcome
                    `}
                </Rule>
                <h1>⸻</h1>
                <Rule title="8. Score Updates & Communication">
                    {`
                        Official scores and participant standings will be updated daily, reflecting matches played the previous day
                        Updates will be shared via email to all participants (official communication channel)
                        An optional WhatsApp group may be created for informal updates and participant interaction
                    `}
                </Rule>
                <h1>⸻</h1>
                <Rule title="9. Determination of Winner">
                    {`
                        Total points are calculated as the sum of all points earned across all group stage matches
                        The participant with the highest total points at the end of the group stage is the winner
                        In case of a tie, the prize will be divided equally among tied participants
                    `}
                </Rule>
                <h1>⸻</h1>
                <Rule title="10. Prize Distribution">
                    {`
                        Winner(s) will receive the entire prize pool
                        Prize distribution will take place on July 8
                        Payment will be made in cash (or agreed electronic method if necessary)
                        Distribution will occur in the presence of at least one witness
                    `}
                </Rule>
                <h1>⸻</h1>
                <Rule title="11. Payment Methods">
                    {`
                        Accepted payment methods:
                        Cash
                        Zelle
                        Venmo
                        Payment must be completed on or before the submission deadline
                    `}
                </Rule>
                <h1>⸻</h1>
                <Rule title="12. Disputes & Resolution">
                    {`
                        These rules serve as the primary reference for all decisions
                        In case of dispute, the organizer will review the situation
                        If necessary, a neutral participant witness may assist in arbitration
                        All decisions are final and binding
                    `}
                </Rule>
                <h1>⸻</h1>
                <Rule title="13. Integrity & Official Records">
                    {`
                        The organizer will retain a master copy of all submitted entries
                        All distributed copies are for transparency; however, in case of discrepancy, the organizer’s master copy will be considered the official version
                    `}
                </Rule>
                <h1>⸻</h1>
                <p>By participating, all entrants agree to abide by these rules in full.</p>
            </div>
        );
    }
}

class Rule extends React.Component {
    render() {
        return (
            <>
                <h3>{this.props.title}</h3>
                <div style={{ whiteSpace: "pre-line" }}>
                    {this.props.children}
                </div>
            </>
        );
    }
}

export default RulesPage;