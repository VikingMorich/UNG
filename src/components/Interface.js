import React from 'react';
import { useTranslation } from "react-i18next"
import { takeDmg, usePotion, getRandomInt } from '../api/gameFunctions'
import { winExp, getRandomEnemy } from '../api/gameFunctionsOld'
import { enemiesList } from '../api/gameDatabase'

export default function Interface() {
    const [t, i18n] = useTranslation("global")
    const useTakeDmg = () => takeDmg(5)
    const useUsePotion = () => usePotion(20)
    const useWinExp = () => winExp(80)
    //const useWinGold = () => winRandomGold(100)
    const goToReward = () => window.location = '/reward'
    const goToSkill = () => window.location = '/skill'
    const goToStory = () => window.location = '/story'
    const goToStoryTalk = () => window.location = '/story-talk'
    const goToShop = () => window.location = '/shop'
    const goToHistory = () => window.location = '/history'
    const goToBattle = () => getRandomEnemy(enemiesList.normal[getRandomInt(enemiesList.normal.length)])
    const goToBattleLvl2 = () => getRandomEnemy(enemiesList.hard[getRandomInt(enemiesList.hard.length)])
    //const goToStory2 = () => window.location = '/story2'

    
    return (
        <React.Fragment>
            <h1>*Interface*</h1>
            <ul className='ul-list'>
                <li className='link' onClick={useTakeDmg}>* Take 5 damage *</li>
                <li className='link' onClick={useUsePotion}>* Restore 20 life *</li>
                <li className='link' onClick={useWinExp}>* Win 80 EXP *</li>
                <li className='link' onClick={goToReward}>* Random reward *</li>
                <li className='link' onClick={goToSkill}>* Skill hability *</li>
                <li className='link' onClick={goToBattle}>* Try battle mode (add, history of last dmg taken?)*</li>
                <li className='link' onClick={goToBattleLvl2}>* Try battle mode 2nd lvl enemies*</li>
                <li className='link' onClick={goToStory}>* Try page swap animation v1.0 *</li>
                <li className='link' onClick={goToStoryTalk}>* View someone talks *</li>
                <li className='link' onClick={goToShop}>* Mercader amb opcions *</li>
                <li className='link' onClick={goToHistory}>* History *</li>
            </ul>
            <div id="player" className="user-hud">
                
            </div>
        </React.Fragment>
    );
}