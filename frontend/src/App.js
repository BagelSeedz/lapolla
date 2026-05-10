import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import StartPage from "./StartPage";
import ScoreInputPage from "./ScoreInputPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import RulesPage from "./RulesPage";
import Navbar from "./Navbar";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };

    this.updateUser = this.updateUser.bind(this);
    this.logout = this.logout.bind(this);
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

  logout() {
    fetch("http://localhost:8000/api/logout_user/", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken")
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
              path="/score-input"
              element={<ScoreInputPage user={this.state.user} />}
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
              element={<SignUpPage/>}
            />
          </Routes>
        </HashRouter>
      </>
    );
  }
}

export default App;