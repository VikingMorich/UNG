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
    const goToStory = () => window.location = '/story'
    const goToStory2 = () => window.location = '/story2'

    
    return (
        <React.Fragment>
            <h1>*Interface*</h1>
            <ul className='ul-list'>
                <li className='link' onClick={useTakeDmg}>* Take 5 damage *</li>
                <li className='link' onClick={useUsePotion}>* Restore 20 live *</li>
                <li className='link' onClick={useWinExp}>* Win 40 EXP *</li>
                <li className='link' onClick={useWinGold}>* Coin random reward *</li>
                <li className='link' onClick={goToSkill}>* Skill hability *</li>
                <li>* Try battle mode *</li>
                <li className='link' onClick={goToStory}>* Try page swap animation v1.0 *</li>
                <li>* Try option selecion *</li>
                <li>* Mochila object features *</li>
            </ul>
            <div id="player" className="user-hud">
                
            </div>
        </React.Fragment>
    );
}