import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./utils/history";
import Profile from "./Profile";

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" exact component={Profile} />
      </Switch>
    </Router>
  );
}

function Home() {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect,
    logout,
  } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <div>
      <h1>HOME</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : isAuthenticated ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <button onClick={loginWithRedirect}>Log in</button>
      )}
    </div>
  );
}
