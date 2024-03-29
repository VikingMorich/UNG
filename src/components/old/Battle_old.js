import React from 'react';
import { useTranslation } from "react-i18next"
import { removeLastBattleAttak } from '../../api/gameFunctionsOld'


export default function Battle() {
    const [t, i18n] = useTranslation("global")

    const goGame = () => removeLastBattleAttak()

    return (
        <div className='battle-page'>
            <div className='battle-header'>
                <span className='link' onClick={goGame}>* Back *</span>
                <h1>* BATTLE *</h1>
            </div>
            <div id="enemy" className='enemy-hud'>

            </div>
            <div id="battle">

            </div>
            <div id="player" className="user-hud">
                
            </div>
        </div>
    );
}