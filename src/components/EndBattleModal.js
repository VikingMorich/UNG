import React from 'react';
import { useTranslation } from "react-i18next"
import { ObjHelmet, ObjNone, ObjBoots, ObjSword, ObjShield, ObjRing, ObjNecklace, ObjArmor, ObjCoins, ObjExp } from './icon/objectIcon'
import { saveBattleReward } from '../api/gameFunctions'


export default function EndBattleModal(props) {
    const [t] = useTranslation("global")

    const collectFunc = () => {
        saveBattleReward(props.reward)
    }
    const goGame = () => window.location = '/game'

    return (
        <React.Fragment>
            {props.open && 
                <div className="c-battle-modal-background">
                    <div className={`c-battle-modal--content`}>
                        {props.type === 'win' &&
                            <React.Fragment>
                                <h2>* You win *</h2>
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
                                            <td className="maximize">{element.name}</td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                                <div className={`button`} onClick={collectFunc}>
                                    <span>* Collect *</span>
                                </div>
                            </React.Fragment>
                        }
                        {props.type === 'lose' && 
                            <React.Fragment>
                                <h2>* You lose *</h2>
                                <img className="background-img" alt="dead" src='./tomb.png' />
                                <div className="button" onClick={goGame}>
                                    <span>* OK 🥲 *</span>
                                </div>
                            </React.Fragment>
                        }
                    </div>
                </div>
            }
        </React.Fragment>
    );
}