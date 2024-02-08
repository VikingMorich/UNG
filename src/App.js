import React from "react";
import "./index.css"
import "./scss/main.scss"
import Header from './components/Header'
import Home from './components/Home'
import Story from './components/Story'
import Name from './components/Name'
import CharacterSelection from './components/CharacterSelection'
import Interface from './components/Interface'


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {

return (
<Router>
  <main>
    <Header /> 
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/story" exact component={Story} />
      <Route path="/name" exact component={Name} />
      <Route path="/character-selection" exact component={CharacterSelection} />
      <Route path="/tryhard" exact component={Interface} />
    </Switch>
  </main>
</Router>
  );
}