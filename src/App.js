import React from "react";
import "./index.css"
import "./scss/main.scss"
import Header from './components/Header'
import Home from './components/Home'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {

return (
<Router>
  <main>
    <Header /> 
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  </main>
</Router>
  );
}