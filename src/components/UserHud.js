import React from 'react';
import { useTranslation } from "react-i18next"
import ProgressBar from './ProgressBar'

export default function UserHud(props) {
    const [t, i18n] = useTranslation("global");
    
    return (
        <React.Fragment>
            <div className="user-wrapper">
              <div className='user-img-wrap'>
                <img className="user-img" alt="user-character" src="./orco.jpeg" />
                <div className='user-lvl'>
                  <span>{props.state.gameStates.LVL}</span>
                </div>
              </div>
              <div className="user-bars">
                <span className='user-name'>{props.state.username}</span>
                <div className="user-stat">
                  <span className='text-stat'>HP</span>
                  <ProgressBar value={props.state.gameStates.HP} maxValue={props.state.gameStates.maxHP} color='red' />
                </div>
                <div className="user-stat">
                  <span className='text-stat'>EXP</span>
                  <ProgressBar value={props.state.gameStates.EXP} maxValue={props.state.gameStates.maxEXP} color='blue' />
                </div>
                <div className="user-statistics">
                  <div className="char-stat">
                    <span>💪🏻</span>
                    <span>{props.state.gameStates.FUE}</span>
                  </div>
                  <div className="char-stat">
                    <span>🧠</span>
                    <span>{props.state.gameStates.INT}</span>
                  </div>
                  <div className="char-stat">
                    <span>👁️</span>
                    <span>{props.state.gameStates.PUN}</span>
                  </div>
                  <div className="char-stat">
                    <span>🍀</span>
                    <span>{props.state.gameStates.SUE}</span>
                  </div>
                </div>
              </div>
              <div className="stats-char">
                <div className="char-stat">
                  <span>⚔️</span>
                  <span>{props.state.gameStates.ATK}</span>
                </div>
                <div className="char-stat">
                  <span>🛡️</span>
                  <span>{props.state.gameStates.DEF}</span>
                </div>
                <div className="char-stat">
                  <span>💰</span>
                  <span>{props.state.gameStates.gold}</span>
                </div>
                <div className="char-inv">
                  <span>🎒</span>
                </div>
              </div>
            </div>
        </React.Fragment>
    );
}