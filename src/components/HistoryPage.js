import React from 'react';
import { historyPages } from '../api/gameHistory'
import StoryAnimationStartGame from './StoryAnimationStartGame';
import CharacterSelection from './CharacterSelection';
import StoryTalk from './StoryTalk';
import { setHistoryPage } from '../api/gameFunctions'
import Name from './Name';
import Book from './Book'
import UserHud from './UserHud'
import Questionary from './Questionary';
import Shop from './Shop';
import Battle from './Battle';
import EndGame from './EndGame'
import Reward from './Reward';


export default function HistoryPage(props) {

    return (
        <React.Fragment>
          {props.state.gameStates.history === 'page0' &&
          <CharacterSelection />
          }
          {props.state.gameStates.history === 'page00' &&
          <StoryAnimationStartGame />
          }
          {historyPages[props.state.gameStates.history] && historyPages[props.state.gameStates.history].type === 'talk' &&
            <StoryTalk values={historyPages[props.state.gameStates.history]} pagekey={props.state.gameStates.history} />
          }
          {historyPages[props.state.gameStates.history] && historyPages[props.state.gameStates.history].type === 'name' &&
            <Name values={historyPages[props.state.gameStates.history]}/>
          }
          {historyPages[props.state.gameStates.history] && historyPages[props.state.gameStates.history].type === 'book' &&
            <React.Fragment>
              <Book values={historyPages[props.state.gameStates.history]} pagekey={props.state.gameStates.history}/>
              <div id="player" className="user-hud">
                <UserHud state={props.state} />
              </div>
            </React.Fragment>
          }
          {historyPages[props.state.gameStates.history] && historyPages[props.state.gameStates.history].type === 'questionary' &&
            <Questionary end={historyPages[props.state.gameStates.history].end} />
          }
          {historyPages[props.state.gameStates.history] && historyPages[props.state.gameStates.history].type === 'shop' &&
            <Shop values={historyPages[props.state.gameStates.history]} state={props.state} />
          }
          {historyPages[props.state.gameStates.history] && historyPages[props.state.gameStates.history].type === 'battle' &&
            <Battle values={historyPages[props.state.gameStates.history]} state={props.state} />
          }
          {historyPages[props.state.gameStates.history] && historyPages[props.state.gameStates.history].type === 'end' &&
            <EndGame />
          }
          {historyPages[props.state.gameStates.history] && historyPages[props.state.gameStates.history].type === 'reward' &&
            <Reward values={historyPages[props.state.gameStates.history]} state={props.state} />
          }
          {props.state.gameStates.history !== 'page00' && !historyPages[props.state.gameStates.history] &&
            <button onClick={() => {setHistoryPage('page0')}}>Restart</button>
          }
        </React.Fragment>
    );
}