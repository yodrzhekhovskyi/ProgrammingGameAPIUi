import React, { useState } from "react";
import { NavMenu } from "./NavMenu";
import Container from "react-bootstrap/Container";
import { Switch, Route } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";
import { Register } from "./Register";
import { RiddlesList } from "./Riddles";
import { SolveRiddlePage } from './SolveRiddlePage';
import { LadderList } from "./LadderList";
import { PlaygroundPage } from "./PlaygroundPage";

export function Layout(props) {
  const [loggedIn, setIsLoggedIn] = useState();
  const [loggedUser, setLoggedUser] = useState();

  const onLoggedIn = (loggedIn, user) => {
    setIsLoggedIn(loggedIn);
    setLoggedUser(user);
  };

  return (
    <div>
      <NavMenu
        loggedIn={loggedIn}
        loggedUser={loggedUser}
        onLoggedIn={onLoggedIn}
      />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/riddles">
            <RiddlesList />
          </Route>
          <Route path="/riddles/:id">
            <SolveRiddlePage />
          </Route>
          <Route path="/login">
            <Login onLoggedIn={onLoggedIn} />
          </Route>
          <Route path="/register">
            <Register onLoggedIn={onLoggedIn} />
          </Route>
          <Route path="/ladder">
            <LadderList />
          </Route>
          <Route path="/playground">
            <PlaygroundPage />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}
