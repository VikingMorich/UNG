import React, {useState, useEffect} from 'react';
import { useTranslation } from "react-i18next"
import RollingDice from './RollingDice'
import { rollDices, getGameStates } from '../api/gameFunctions'
import { skillsWarrior } from '../api/gameDatabase'
import { Tooltip as ReactTooltip } from 'react-tooltip'

export default function Battle() {
    const [t, i18n] = useTranslation("global")
    const [even, setEven] = useState(false)
    const [even2, setEven2] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [gameStates, setGameStates] = useState(null)

    let mapCombatWarriorSkills = []
    skillsWarrior.combat.forEach(el => {
        if (el.children) {
            el.children.forEach(ele => {
                mapCombatWarriorSkills.push(ele)
            })
        }
        mapCombatWarriorSkills.push(el)
    })
    
    useEffect(() => {
        getGameStates().then((value) => {
            setGameStates(value.val())
        })
    }, []);
    
    const rollDicesFunc = () => {
        if (!disabled) {
            setEven(!even)
            setTimeout(() => setEven2(!even2), 300)
            setDisabled(!disabled)
            rollDices()
            setTimeout(() => setEven(!even), 500)
            setTimeout(() => setEven2(!even2), 800)
            setTimeout(() => {
                setDisabled(false)
            }, 2500)
        }
    }
    const goGame = () => window.location = '/game'

    return (
        <React.Fragment>
            <h1>* BATTLE *</h1>
            <div id="enemy" className='enemy-hud'>

            </div>
            <div className="e-dice-wrapper">
                <RollingDice id="e-dice-1" color='orange' even={!even2} visible={true}/>
                <RollingDice id="e-dice-2" color='orange' even={even2} visible={true}/>
                <RollingDice id="e-dice-3" color='orange' even={!even2} visible={true}/>
            </div>
            <div className='current-op'>
                <div className='op-list'>
                    <ul className='ul-list'>
                        <li className='link' onClick={goGame}>* Back *</li>
                        <li className={`link ${disabled ? 'disabled' : ''}`} onClick={rollDicesFunc}>* Atack *</li>
                        {gameStates && gameStates.learnedSkills && gameStates.learnedSkills.includes('Doublestrike') &&
                            <li className={`link ${disabled ? 'disabled' : ''}`} onClick={rollDicesFunc} data-tooltip-id="tooltip-attack" data-tooltip-html={mapCombatWarriorSkills.find(el => el.name === 'Doublestrike').description + '</br>Countdown: ' + mapCombatWarriorSkills.find(el => el.name === 'Doublestrike').countdown}>* Doublestrike (countdown) *</li>
                        }
                        {gameStates && gameStates.learnedSkills && gameStates.learnedSkills.includes('PowerAttak') &&
                            <li className={`link ${disabled ? 'disabled' : ''}`} onClick={rollDicesFunc} data-tooltip-id="tooltip-attack" data-tooltip-html={mapCombatWarriorSkills.find(el => el.name === 'PowerAttak').description + '</br>Countdown: ' + mapCombatWarriorSkills.find(el => el.name === 'PowerAttak').countdown}>* PowerAttak (countdown) *</li>
                        }
                    </ul>
                </div>
                <ReactTooltip id="tooltip-attack" place="top" type="dark" effect="float"/>
                <div className="dice-wrapper">
                    <RollingDice id="dice-1" color='olive' even={even} visible={true} />
                    <RollingDice id="dice-2" color='olive' even={!even} visible={true}/>
                    <RollingDice id="dice-3" color='olive' even={even} visible={true}/>
                    <RollingDice id="dice-4" color='olive' even={!even} visible={false}/>
                    <RollingDice id="dice-5" color='olive' even={even} visible={false}/>
                </div>
            </div>
            <div id="player" className="user-hud">
                
            </div>
        </React.Fragment>
    );
}