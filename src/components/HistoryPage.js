import React from 'react';
import { useTranslation } from "react-i18next"
import { history } from '../api/gameHistory'
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


export default function HistoryPage(props) {
    const [t, i18n] = useTranslation("global")

    return (
        <React.Fragment>
          {props.state.gameStates.history === 'page0' &&
          <CharacterSelection />
          }
          {props.state.gameStates.history === 'page00' &&
          <StoryAnimationStartGame />
          }
          {history[props.state.gameStates.history] && history[props.state.gameStates.history].type === 'talk' &&
            <StoryTalk values={history[props.state.gameStates.history]}/>
          }
          {history[props.state.gameStates.history] && history[props.state.gameStates.history].type === 'name' &&
            <Name values={history[props.state.gameStates.history]}/>
          }
          {history[props.state.gameStates.history] && history[props.state.gameStates.history].type === 'book' &&
            <React.Fragment>
              <Book values={history[props.state.gameStates.history]}/>
              <div id="player" className="user-hud-new">
                <UserHud state={props.state} />
              </div>
            </React.Fragment>
          }
          {history[props.state.gameStates.history] && history[props.state.gameStates.history].type === 'questionary' &&
            <Questionary end={history[props.state.gameStates.history].end} />
          }
          {history[props.state.gameStates.history] && history[props.state.gameStates.history].type === 'shop' &&
            <Shop values={history[props.state.gameStates.history]} state={props.state} />
          }
          {history[props.state.gameStates.history] && history[props.state.gameStates.history].type === 'battle' &&
            <Battle values={history[props.state.gameStates.history]} state={props.state} />
          }
          {history[props.state.gameStates.history] && history[props.state.gameStates.history].type === 'end' &&
            <EndGame />
          }
          {props.state.gameStates.history !== 'page00' && !history[props.state.gameStates.history] &&
            <button onClick={() => {setHistoryPage('page0')}}>Restart</button>
          }
        </React.Fragment>
    );
}