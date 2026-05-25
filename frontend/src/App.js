import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import StartPage from "./StartPage";
import ScoreInputPage from "./ScoreInputPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import RulesPage from "./RulesPage";
import Navbar from "./Navbar";
import SheetsPage from "./SheetsPage";

async function fetchCSRFToken() {
    const res = await fetch("https://lapolla-a992dd24e979.herokuapp.com/api/csrf/", {
        credentials: "include"
    });
    const data = await res.json();
    return data.csrfToken;
}

function ScoreInputWrapper(props) {
  const search = window.location.hash.split("?")[1];
  const params = new URLSearchParams(search);
  const sheetId = params.get("sheet_id");

  return <ScoreInputPage {...props} sheetId={sheetId} />;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      selectedSheetId: null,
    };

    this.updateUser = this.updateUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // 1. Get CSRF cookie
    fetch("https://lapolla-a992dd24e979.herokuapp.com/api/csrf/", {
      credentials: "include"
    });

    // 2. Then fetch /me
    fetch("https://lapolla-a992dd24e979.herokuapp.com/api/me/", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          user: data,
          loading: false,
          selectedSheetId: data.firstSheetId || null
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  updateUser() {
    return fetch("https://lapolla-a992dd24e979.herokuapp.com/api/me/", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ user: data });
        console.log(data);
        return data;
      });
  }

  async logout() {
    const csrfToken = await fetchCSRFToken();

    fetch("https://lapolla-a992dd24e979.herokuapp.com/api/logout_user/", {
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
            // Tell App to refresh user state
            this.updateUser().then(() => {
                window.location.hash = "#/";
            });
        } else {
            console.log("Failed to log out. An error occurred.")
        }
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <Navbar user={this.state.user} logout={this.logout}/>
        <HashRouter>
          <Routes>
            <Route
              path="/"
              element={<StartPage user={this.state.user}/>}
            />
            <Route
              path="/sheets"
              element={<SheetsPage user={this.state.user}/>}
            />
            <Route
              path="/score-input"
              element={<ScoreInputWrapper user={this.state.user} />}
            />
            <Route
              path="/rules"
              element={<RulesPage/>}
            />
            <Route
              path="/login"
              element={<LoginPage onLogin={this.updateUser}/>}
            />
            <Route
              path="/register"
              element={<SignUpPage onLogin={this.updateUser}/>}
            />
          </Routes>
        </HashRouter>
      </>
    );
  }
}

export default App;