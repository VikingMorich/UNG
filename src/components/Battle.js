import React, {useState} from 'react';
import { useTranslation } from "react-i18next"
import RollingDice from './RollingDice'
import { rollDices } from '../api/gameFunctions'

export default function Battle() {
    const [t, i18n] = useTranslation("global")
    const [even, setEven] = useState(false)
    
    const rollDicesFunc = () => {
        setEven(!even)
        rollDices('FUE')
        setTimeout(setEven(!even), 500)
    }
    const goGame = () => window.location = '/game'

    return (
        <React.Fragment>
            <h1>* BATTLE *</h1>
            <div id="enemy" className='enemy-hud'>

            </div>
            <div className="e-dice-wrapper">
                <RollingDice id="e-dice-1" color='orange' even={!even}/>
                <RollingDice id="e-dice-2" color='orange' even={even}/>
                <RollingDice id="e-dice-3" color='orange' even={!even}/>
            </div>
            <div className='current-op'>
                <div className='op-list'>
                    <ul className='ul-list'>
                        <li className='link' onClick={goGame}>* Back *</li>
                        <li className='link' onClick={rollDicesFunc}>* Atack 💪🏻 *</li>
                    </ul>
                </div>
                <div className="dice-wrapper">
                    <RollingDice id="dice-1" color='olive' even={even}/>
                    <RollingDice id="dice-2" color='olive' even={!even}/>
                    <RollingDice id="dice-3" color='olive' even={even}/>
                </div>
            </div>
            <div id="player" className="user-hud">
                
            </div>
        </React.Fragment>
    );
}