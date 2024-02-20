import React from 'react';
//import { useTranslation } from "react-i18next"
import ProgressBar from './ProgressBar'

export default function EnemyHud(props) {
    //const [t, i18n] = useTranslation("global");

    let imgCharacter = props.state.imgSrc

    return (
        <React.Fragment>
            <div className="enemy-wrapper">
              <div className='enemy-img-wrap'>
                <img className="enemy-img" alt="enemy-character" src={props.state.HP === 0 ? "./low-poly-skull-print.jpg" : imgCharacter}/>
              </div>
              <div className="enemy-bars">
                <span className='enemy-name'>{props.state.name}</span>
                <div className="enemy-stat">
                  <span className='text-stat'>HP</span>
                  <ProgressBar value={props.state.HP} maxValue={props.state.maxHP} color='red' />
                </div>
              </div>
              <div className="stats-char">
                <div className="char-stat">
                  <span>⚔️</span>
                  <span>{props.state.ATK}</span>
                </div>
                <div className="char-stat">
                  <span>🛡️</span>
                  <span>{props.state.DEF}</span>
                </div>
              </div>
            </div>
        </React.Fragment>
    );
}