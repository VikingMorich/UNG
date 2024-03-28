import { Tooltip as ReactTooltip } from 'react-tooltip'
import { skillsWarrior, skillsMage, skillsArcher } from '../api/gameDatabase'
import React, {useState} from 'react';
import RollingDice from './RollingDice'
import { rollDices } from '../api/gameFunctions'
import { useTranslation } from "react-i18next"

export default function BattlePage(props) {
    const [t] = useTranslation("global")
    const [even, setEven] = useState(false)
    const [even2, setEven2] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [numberDices, setNumberDices] = useState(3)

    let mapCombatWarriorSkills = []
    skillsWarrior.combat.forEach(el => {
        if (el.children) {
            el.children.forEach(ele => {
                if (ele.children) {
                    ele.children.forEach(elem => {
                        mapCombatWarriorSkills.push(elem)
                    })
                }
                mapCombatWarriorSkills.push(ele)
            })
        }
        mapCombatWarriorSkills.push(el)
    })

    let mapCombatMageSkills = []
    skillsMage.combat.forEach(el => {
        if (el.children) {
            el.children.forEach(ele => {
                if (ele.children) {
                    ele.children.forEach(elem => {
                        mapCombatMageSkills.push(elem)
                    })
                }
                mapCombatMageSkills.push(ele)
            })
        }
        mapCombatMageSkills.push(el)
    })

    let mapCombatArcherSkills = []
    skillsArcher.combat.forEach(el => {
        if (el.children) {
            el.children.forEach(ele => {
                if (ele.children) {
                    ele.children.forEach(elem => {
                        mapCombatArcherSkills.push(elem)
                    })
                }
                mapCombatArcherSkills.push(ele)
            })
        }
        mapCombatArcherSkills.push(el)
    })

    

    const rollDoublestrike = () => {
        rollDicesFunc('Doublestrike')
    }

    const rollPowerAttack = () => {
        setNumberDices(5)
        rollDicesFunc('PowerAttack', 5)
        setTimeout(() => {
            setNumberDices(3)
        }, 3000)
    }

    const rollHeadshot = () => {
        setNumberDices(4)
        rollDicesFunc('Headshot', 4)
        setTimeout(() => {
            setNumberDices(3)
        }, 3000)
    }

    const rollMultishot = () => {
        rollDicesFunc('Multishot')
    }

    const rollFireball = () => {
        rollDicesFunc('Fireball')
    }

    const rollGhostAttack = () => {
        rollDicesFunc('GhostAttack')
    }

    const rollCharge = () => {
        rollDicesFunc('Charge')
    }

    const rollVampireArrow = () => {
        rollDicesFunc('VampireArrow')
    }

    const rollRejuvenate = () => {
        setNumberDices(0)
        rollDicesFunc('Rejuvenate', 0)
        setTimeout(() => {
            setNumberDices(3)
        }, 3000)
    }
    
    const rollDicesFunc = (type, num) => {
        let t = type || 'Attack'
        let n = num || 3
        if (!disabled) {
            setEven(!even)
            setTimeout(() => setEven2(!even2), 300)
            setDisabled(!disabled)
            rollDices(t, n)
            setTimeout(() => setEven(!even), 500)
            setTimeout(() => setEven2(!even2), 800)
            setTimeout(() => {
                setDisabled(false)
            }, 3000)
        }
    }

    return (
        <React.Fragment>
            <div className="e-dice-wrapper">
                <RollingDice id="e-dice-1" color='orange' even={!even2} visible={true}/>
                <RollingDice id="e-dice-2" color='orange' even={even2} visible={true}/>
                <RollingDice id="e-dice-3" color='orange' even={!even2} visible={true}/>
            </div>
            <div className='current-op'>
                <div className='op-list'>
                    <ul className='ul-list'>
                        <li className={`link ${disabled ? 'disabled' : ''}`} onClick={rollDicesFunc}>{t('battle.attack')}</li>
                        { props.state.learnedSkills && props.state.learnedSkills.includes('Doublestrike') &&
                        //(!props.state.battle.countdown || props.state.battle.countdown['Doublestrike'])
                            <li className={`link ${(disabled || (props.state.battle.countdown && props.state.battle.countdown['Doublestrike'])) ? 'disabled' : ''}`} onClick={rollDoublestrike} data-tooltip-id="tooltip-attack" data-tooltip-html={t('user-hud.'+mapCombatWarriorSkills.find(el => el.name === 'Doublestrike').description) + '</br>'+t('user-hud.countdown') + mapCombatWarriorSkills.find(el => el.name === 'Doublestrike').countdown}>{t('user-hud.Doublestrike')} {props.state.battle.countdown && props.state.battle.countdown['Doublestrike'] ? '(' + props.state.battle.countdown['Doublestrike'] + ')' : ''}</li>
                        }
                        {props.state && props.state.learnedSkills && props.state.learnedSkills.includes('PowerAttack') &&
                            <li className={`link ${disabled || (props.state.battle.countdown && props.state.battle.countdown['PowerAttack']) ? 'disabled' : ''}`} onClick={rollPowerAttack} data-tooltip-id="tooltip-attack" data-tooltip-html={t('user-hud.'+mapCombatWarriorSkills.find(el => el.name === 'PowerAttack').description) + '</br>'+t('user-hud.countdown') + mapCombatWarriorSkills.find(el => el.name === 'PowerAttack').countdown}>{t('user-hud.PowerAttack')} {props.state.battle.countdown && props.state.battle.countdown['PowerAttack'] ? '(' + props.state.battle.countdown['PowerAttack'] + ')' : ''}</li>
                        }
                        {props.state && props.state.learnedSkills && props.state.learnedSkills.includes('Charge') &&
                            <li className={`link ${disabled || (props.state.battle.countdown && props.state.battle.countdown['Charge']) ? 'disabled' : ''}`} onClick={rollCharge} data-tooltip-id="tooltip-attack" data-tooltip-html={t('user-hud.'+mapCombatWarriorSkills.find(el => el.name === 'Charge').description) + '</br>'+t('user-hud.countdown') + mapCombatWarriorSkills.find(el => el.name === 'Charge').countdown}>{t('user-hud.Charge')} {props.state.battle.countdown && props.state.battle.countdown['Charge'] ? '(' + props.state.battle.countdown['Charge'] + ')' : ''}</li>
                        }
                        {props.state && props.state.learnedSkills && props.state.learnedSkills.includes('Fireball') &&
                            <li className={`link ${disabled || (props.state.battle.countdown && props.state.battle.countdown['Fireball']) ? 'disabled' : ''}`} onClick={rollFireball} data-tooltip-id="tooltip-attack" data-tooltip-html={t('user-hud.'+mapCombatMageSkills.find(el => el.name === 'Fireball').description) + '</br>'+t('user-hud.countdown') + mapCombatMageSkills.find(el => el.name === 'Fireball').countdown}>{t('user-hud.Fireball')} {props.state.battle.countdown && props.state.battle.countdown['Fireball'] ? '(' + props.state.battle.countdown['Fireball'] + ')' : ''}</li>
                        }
                        {props.state && props.state.learnedSkills && props.state.learnedSkills.includes('Rejuvenate') &&
                            <li className={`link ${disabled || (props.state.battle.countdown && props.state.battle.countdown['Rejuvenate']) ? 'disabled' : ''}`} onClick={rollRejuvenate} data-tooltip-id="tooltip-attack" data-tooltip-html={t('user-hud.'+mapCombatMageSkills.find(el => el.name === 'Rejuvenate').description) + '</br>'+t('user-hud.countdown') + mapCombatMageSkills.find(el => el.name === 'Rejuvenate').countdown}>{t('user-hud.Rejuvenate')} {props.state.battle.countdown && props.state.battle.countdown['Rejuvenate'] ? '(' + props.state.battle.countdown['Rejuvenate'] + ')' : ''}</li>
                        }
                        {props.state && props.state.learnedSkills && props.state.learnedSkills.includes('GhostAttack') &&
                            <li className={`link ${disabled || (props.state.battle.countdown && props.state.battle.countdown['GhostAttack']) ? 'disabled' : ''}`} onClick={rollGhostAttack} data-tooltip-id="tooltip-attack" data-tooltip-html={t('user-hud.'+mapCombatMageSkills.find(el => el.name === 'GhostAttack').description) + '</br>'+t('user-hud.countdown') + mapCombatMageSkills.find(el => el.name === 'GhostAttack').countdown}>{t('user-hud.GhostAttack')} {props.state.battle.countdown && props.state.battle.countdown['GhostAttack'] ? '(' + props.state.battle.countdown['GhostAttack'] + ')' : ''}</li>
                        }
                        {props.state && props.state.learnedSkills && props.state.learnedSkills.includes('Headshot') &&
                            <li className={`link ${disabled || (props.state.battle.countdown && props.state.battle.countdown['Headshot']) ? 'disabled' : ''}`} onClick={rollHeadshot} data-tooltip-id="tooltip-attack" data-tooltip-html={t('user-hud.'+mapCombatArcherSkills.find(el => el.name === 'Headshot').description) + '</br>'+t('user-hud.countdown') + mapCombatArcherSkills.find(el => el.name === 'Headshot').countdown}>{t('user-hud.Headshot')} {props.state.battle.countdown && props.state.battle.countdown['Headshot'] ? '(' + props.state.battle.countdown['Headshot'] + ')' : ''}</li>
                        }
                        {props.state && props.state.learnedSkills && props.state.learnedSkills.includes('Multishot') &&
                            <li className={`link ${disabled || (props.state.battle.countdown && props.state.battle.countdown['Multishot']) ? 'disabled' : ''}`} onClick={rollMultishot} data-tooltip-id="tooltip-attack" data-tooltip-html={t('user-hud.'+mapCombatArcherSkills.find(el => el.name === 'Multishot').description) + '</br>'+t('user-hud.countdown') + mapCombatArcherSkills.find(el => el.name === 'Multishot').countdown}>{t('user-hud.Multishot')} {props.state.battle.countdown && props.state.battle.countdown['Multishot'] ? '(' + props.state.battle.countdown['Multishot'] + ')' : ''}</li>
                        }
                        {props.state && props.state.learnedSkills && props.state.learnedSkills.includes('VampireArrow') &&
                            <li className={`link ${disabled || (props.state.battle.countdown && props.state.battle.countdown['VampireArrow']) ? 'disabled' : ''}`} onClick={rollVampireArrow} data-tooltip-id="tooltip-attack" data-tooltip-html={t('user-hud.'+mapCombatArcherSkills.find(el => el.name === 'VampireArrow').description) + '</br>'+t('user-hud.countdown') + mapCombatArcherSkills.find(el => el.name === 'VampireArrow').countdown}>{t('user-hud.VampireArrow')} {props.state.battle.countdown && props.state.battle.countdown['VampireArrow'] ? '(' + props.state.battle.countdown['VampireArrow'] + ')' : ''}</li>
                        }
                    </ul>
                </div>
                <ReactTooltip id="tooltip-attack" place="top" type="dark" effect="float" className='font-tooltip'/>
                <div className="dice-wrapper">
                    <RollingDice id="dice-1" color='olive' even={even} visible={numberDices >= 1} />
                    <RollingDice id="dice-2" color='olive' even={!even} visible={numberDices >= 2}/>
                    <RollingDice id="dice-3" color='olive' even={even} visible={numberDices >= 3}/>
                    <RollingDice id="dice-4" color='olive' even={!even} visible={numberDices >= 4}/>
                    <RollingDice id="dice-5" color='olive' even={even} visible={numberDices >= 5}/>
                </div>
            </div>
        </React.Fragment>
    );
}