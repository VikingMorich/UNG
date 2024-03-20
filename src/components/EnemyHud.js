import React from 'react';
//import { useTranslation } from "react-i18next"
import ProgressBar from './ProgressBar'
import { Burned, Stuned, Poisoned, BasicAttack, BasicStrength, BasicShield } from './icon/icon';

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
                <span className='enemy-name'>{props.state.name} 
                  {props.state.countdown?.Burned && 
                    <div className='enemy-state'><Burned/></div>
                  }
                  {props.state.countdown?.Stuned && 
                    <div className='enemy-state'><Stuned/></div>
                  }
                </span>
                <div className="enemy-stat">
                  <span className='text-stat'>HP</span>
                  <ProgressBar value={props.state.HP} maxValue={props.state.maxHP} lastAttack={props.state.lastPlayerDmg || 0} color='red' />
                </div>
              </div>
              <div className="stats-char">
                <div className="char-stat">
                  <div className='basic-state-icon'>
                    <BasicAttack/>
                  </div>
                  <span>{props.state.ATK}</span>
                </div>
                <div className="char-stat">
                  <div className='basic-state-icon'>
                    <BasicShield/>
                  </div>
                  <span>{props.state.DEF}</span>
                </div>
                <div className="char-stat">
                  <div className='basic-state-icon'>
                    <BasicStrength/>
                  </div>
                  <span>{props.state.FUE}</span>
                </div>
              </div>
              <div className='last-attack-result'>
                <h3>*Last attack result *</h3>
                {(props.state.lastPlayerDmg || props.state.lastEnemyDmg) ?
                <React.Fragment>
                  <div className='op-dmg'>
                    {props.state.name + ': -' + (props.state.lastPlayerDmg || 0 ) + 'HP'}
                  </div>
                  <div className='op-dmg'>
                    {props.username + ': -' + (props.state.lastEnemyDmg || 0) + 'HP'}
                  </div>
                </React.Fragment> :
                <div className='op-dmg'>
                  * No previous attacks *
                </div>
                }
                
              </div>
            </div>
        </React.Fragment>
    );
}