import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import StartPage from "./StartPage";
import ScoreImportPage from "./ScoreInputPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };

    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    // 1. Get CSRF cookie
    fetch("http://localhost:8000/api/csrf/", {
      credentials: "include"
    });

    // 2. Then fetch /me
    fetch("http://localhost:8000/api/me/", {
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

  updateUser() {
    return fetch("http://localhost:8000/api/me/", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ user: data });
        console.log(data);
        return data;
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
            element={<StartPage user={this.state.user} onLogout={this.updateUser}/>}
          />
          <Route
            path="/score-input"
            element={<ScoreImportPage user={this.state.user} />}
          />
          <Route
            path="/login"
            element={<LoginPage onLogin={this.updateUser}/>}
          />
          <Route
            path="/register"
            element={<SignUpPage/>}
          />
        </Routes>
      </HashRouter>
    );
  }
}

export default App;