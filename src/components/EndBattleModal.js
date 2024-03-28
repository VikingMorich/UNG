import React from 'react';
import { useTranslation } from "react-i18next"
import { ObjHelmet, ObjNone, ObjBoots, ObjSword, ObjShield, ObjRing, ObjNecklace, ObjArmor, ObjCoins, ObjExp } from './icon/objectIcon'
import { saveBattleReward, setHistoryPage } from '../api/gameFunctions'


export default function EndBattleModal(props) {
    const [t] = useTranslation("global")

    const collectFunc = () => {
        saveBattleReward(props.reward, props.values.win)
    }
    const goEnd = () => { setHistoryPage('pageDead') }

    return (
        <React.Fragment>
            {props.open && 
                <div className="c-battle-modal-background">
                    <div className={`c-battle-modal--content`}>
                        {props.type === 'win' &&
                            <React.Fragment>
                                <h2>{t('battle.end-win')}</h2>
                                <img className="background-img" alt="chest" src='./chest.jpg' />
                                <table className='reward-table'>
                                    <tbody>
                                    {props.reward.map((element) => {
                                        return <tr key={element.name}>
                                            <td>{element.count}</td>
                                            <td>
                                                <div className='icon-container'>
                                                    {element.type === 'helmet' && <ObjHelmet/>}
                                                    {element.type === 'boots' && <ObjBoots/>}
                                                    {element.type === 'firstHand' && element.objType === 'sword' && <ObjSword/>}
                                                    {element.type === 'secondHand' && element.objType === 'shield' && <ObjShield/>}
                                                    {element.type === 'armor' && <ObjArmor/>}
                                                    {element.type === 'ring' && <ObjRing/>}
                                                    {element.type === 'necklace' && <ObjNecklace/>}
                                                    {element.type === 'coins' && <ObjCoins/>}
                                                    {element.type === 'EXP' && <ObjExp/>}
                                                    {element.type === 'none' && <ObjNone/>}
                                                </div>
                                            </td>
                                            <td className="maximize">{(element.type === 'EXP' || element.type === 'coins') ? t('battle.'+element.name) : element.name}</td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                                <div className={`button`} onClick={collectFunc}>
                                    <span>{t('battle.end-win-op')}</span>
                                </div>
                            </React.Fragment>
                        }
                        {props.type === 'lose' && 
                            <React.Fragment>
                                <h2>{t('battle.end-lose')}</h2>
                                <img className="background-img" alt="dead" src='./tomb.png' />
                                <div className="button" onClick={goEnd}>
                                    <span>{t('battle.end-lose-op')}</span>
                                </div>
                            </React.Fragment>
                        }
                    </div>
                </div>
            }
        </React.Fragment>
    );
}