import React from "react";
import "./index.css"
import "./scss/main.scss"
import Header from './components/Header'
import Home from './components/Home'
import Cover from './components/Cover'
import StoryAnimation from './components/StoryAnimation'
import StoryAnimation2 from './components/StoryAnimation2'
import Name from './components/old/Name_old'
import CharacterSelection from './components/old/CharacterSelection_old'
import Interface from './components/Interface'
import Contact from './components/Contact'
import Skill_1 from './components/Skill_1'
import Reward from './components/old/Reward'
import Battle from './components/old/Battle_old'
import Shop from './components/old/Shop_old'
import History from './components/History'
import StoryTalk from './components/old/StoryTalk_old'
import Questionary from './components/Questionary'
import { GoogleOAuthProvider } from '@react-oauth/google';

import { initSubscriptions } from './fireSubscription'


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
const CLIENT_ID = '213014914750-ul8qlavh60vm16d6e9d1lqoi2hjvc2hu.apps.googleusercontent.com';
initSubscriptions()
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Router>
        <main>
          {window.location.pathname !== '/' && <Header />}
          <Switch>
            <Route path="/" exact component={Cover} />
            <Route path="/start" exact component={Home} />
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
            <Route path="/questionary" exact component={Questionary} />
            <Route path="/history" exact component={History} />
          </Switch>
        </main>
      </Router>
    </GoogleOAuthProvider>
  );
}