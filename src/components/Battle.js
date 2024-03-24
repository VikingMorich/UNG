import React from 'react';
import { useTranslation } from "react-i18next"
import UserHud from './UserHud';
import EnemyHud from './EnemyHud';
import BattlePage from './BattlePage';


export default function Battle(props) {
    const [t, i18n] = useTranslation("global")

    return (
        <div className='battle-page'>
            <div className='battle-header'>
                <h1>* BATTLE *</h1>
            </div>
            <div id="enemy" className='enemy-hud'>
                <EnemyHud state={props.state.gameStates.battle} username={props.state.username}/>
            </div>
            <div id="battle">
                <BattlePage state={props.state.gameStates } />
            </div>
            <div id="player" className="user-hud-new">
                <UserHud state={props.state} values={props.values}/>
            </div>
        </div>
    );
}