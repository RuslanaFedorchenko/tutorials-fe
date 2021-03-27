import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component.jsx";
import AddAuthor from "./components/add-author.component.jsx";
import Tutorial from "./components/tutorial.component.jsx";
import TutorialsList from "./components/tutorials-list.component";
import AuthorsTable from "./components/authors-table.component.jsx";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/tutorials"} className="navbar-brand">
            Application
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/authors"} className="nav-link">
                Authors
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add tutorial
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addAuthor"} className="nav-link">
                Add author
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            <Route exact path="/authors" component={AuthorsTable} />
            <Route exact path="/add" component={AddTutorial} />
            <Route exact path="/addAuthor" component={AddAuthor} />
            <Route path="/tutorials/:id" component={Tutorial} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
