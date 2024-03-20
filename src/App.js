import React from "react";
import "./index.css"
import "./scss/main.scss"
import Header from './components/Header'
import Home from './components/Home'
import Cover from './components/Cover'
import StoryAnimation from './components/StoryAnimation'
import StoryAnimation2 from './components/StoryAnimation2'
import Name from './components/Name_old'
import CharacterSelection from './components/CharacterSelection_old'
import Interface from './components/Interface'
import Contact from './components/Contact'
import Skill_1 from './components/Skill_1'
import Reward from './components/Reward'
import Battle from './components/Battle'
import Shop from './components/Shop'
import History from './components/History'
import StoryTalk from './components/StoryTalk_old'

import { initSubscriptions } from './fireSubscription'


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
initSubscriptions()
  return (
    <Router>
      <main>
        {window.location.pathname !== '/' && <Header />}
        <Switch>
          <Route path="/" exact component={Cover} />
          <Route path="/home" exact component={Home} />
          <Route path="/story" exact component={StoryAnimation} />
          <Route path="/story2" exact component={StoryAnimation2} />
          <Route path="/story-talk" exact component={StoryTalk} />
          <Route path="/name" exact component={Name} />
          <Route path="/character-selection" exact component={CharacterSelection} />
          <Route path="/game" exact component={Interface} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/skill" exact component={Skill_1} />
          <Route path="/reward" exact component={Reward} />
          <Route path="/battle" exact component={Battle} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/history" exact component={History} />
        </Switch>
      </main>
    </Router>
  );
}