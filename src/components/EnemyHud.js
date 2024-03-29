import React from 'react';
import ProgressBar from './ProgressBar'
import { Burned, Stuned, Poisoned, BasicAttack, BasicStrength, BasicShield } from './icon/icon';
import { useTranslation } from "react-i18next"

export default function EnemyHud(props) {
    const [t] = useTranslation("global")
    let imgCharacter = props.state.imgSrc

    return (
        <React.Fragment>
            <div className="enemy-wrapper">
              <div className="enemy-bars">
                <span className='enemy-name'>{t('enemy.'+props.state.name)} 
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
              <div className='enemy-img-wrap'>
                <img className="enemy-img" alt="enemy-character" src={props.state.HP === 0 ? "./low-poly-skull-print.jpg" : imgCharacter}/>
              </div>
              <div className='last-attack-result'>
                <h3>{t('battle.last-attack-title')}</h3>
                {(props.state.lastPlayerDmg || props.state.lastEnemyDmg) ?
                <React.Fragment>
                  <div className='op-dmg'>
                    {t('enemy.'+props.state.name) + ': -' + (props.state.lastPlayerDmg || 0 ) + 'HP'}
                  </div>
                  <div className='op-dmg'>
                    {props.username + ': -' + (props.state.lastEnemyDmg || 0) + 'HP'}
                  </div>
                </React.Fragment> :
                <div className='op-dmg'>
                  {t('battle.no-attacks')}
                </div>
                }
                
              </div>
            </div>
        </React.Fragment>
    );
}