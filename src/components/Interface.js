import React from 'react';
import { useTranslation } from "react-i18next"
import { takeDmg, usePotion, winExp, winRandomGold } from '../api/gameFunctions'

export default function Interface() {
    const [t, i18n] = useTranslation("global")
    const useTakeDmg = () => takeDmg(5)
    const useUsePotion = () => usePotion(20)
    const useWinExp = () => winExp(40)
    const useWinGold = () => winRandomGold(100)
    const goToSkill = () => window.location = '/skill'

    
    return (
        <React.Fragment>
            <h1>*Interface*</h1>
            <ul className='ul-list'>
                <li className='link' onClick={useTakeDmg}>* Take 5 damage *</li>
                <li className='link' onClick={useUsePotion}>* Restore 20 live *</li>
                <li className='link' onClick={useWinExp}>* Win 40 EXP *</li>
                <li className='link' onClick={useWinGold}>* Coin random reward *</li>
                <li className='link' onClick={goToSkill}>* Skill hability *</li>
            </ul>
            <div id="player" className="user-hud">
                
            </div>
        </React.Fragment>
    );
}