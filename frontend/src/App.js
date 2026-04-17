import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import StartPage from "./StartPage";
import ScoreImportPage from "./ScoreInputPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/me/", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          user: data,
          loading: false
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<StartPage user={this.state.user} />}
          />
          <Route
            path="/score-input"
            element={<ScoreImportPage user={this.state.user} />}
          />
        </Routes>
      </HashRouter>
    );
  }
}

export default App;