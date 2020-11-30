import React from "react";
import "./App.css";
import TabApp from './components/Tabs'
import CustomerTable from "./components/CustomerTable";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <TabApp></TabApp>
      {/* <BrowserRouter>
        <div>
          <Link to="/customers"></Link>
          <Switch>
            <Route exact path="/customers" component={CustomerTable} />
          </Switch>
        </div>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
