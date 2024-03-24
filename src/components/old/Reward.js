import React from 'react';
import { useTranslation } from "react-i18next"
import { getRandomInt, saveReward } from '../../api/gameFunctions'
import { ObjBoots, ObjCoins, ObjHelmet, ObjSword, ObjNone, ObjShield, ObjRing, ObjNecklace, ObjArmor, ObjCrossbow, ObjSpellBook, ObjKnife, ObjPotion, ObjAxe, ObjLance, ObjStaff} from '../icon/objectIcon';
import { itemsList } from '../../api/gameDatabase'

export default function Reward() {
    const [t, i18n] = useTranslation("global")
    //const goToGame = () => window.location = '/game'
    const coinsValue = getRandomInt(100)
    const saveRewardFunc = () => {
        saveReward(coinsValue, itemValue)
    }
    const getRandomObj = () => {
        let objType = Object.keys(itemsList)[getRandomInt(Object.keys(itemsList).length)]
        return itemsList[objType][getRandomInt(itemsList[objType].length)]
    }
    const itemValue = getRandomObj()
    
    return (
        <React.Fragment>
            <div className='reward-view'>
                <h2>* Reward *</h2>
                <img className="background-img" alt="chest" src='./chest.jpg' />
                <table className='reward-table'>
                    <tbody>
                        <tr>
                            <td>{coinsValue}</td>
                            <td>
                                <div className='icon-container'>
                                    <ObjCoins />
                                </div>
                            </td>
                            <td className="maximize">* coins *</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>
                                <div className='icon-container'>
                                    {itemValue.type === 'helmet' && <ObjHelmet/>}
                                    {itemValue.type === 'boots' && <ObjBoots/>}
                                    {itemValue.type === 'firstHand' && itemValue.objType === 'sword' && <ObjSword/>}
                                    {itemValue.type === 'firstHand' && itemValue.objType === 'book' && <ObjSpellBook/>}
                                    {itemValue.type === 'firstHand' && itemValue.objType === 'crossbow' && <ObjCrossbow/>}
                                    {itemValue.type === 'secondHand' && itemValue.objType === 'shield' && <ObjShield/>}
                                    {itemValue.type === 'armor' && <ObjArmor/>}
                                    {itemValue.type === 'ring' && <ObjRing/>}
                                    {itemValue.type === 'necklace' && <ObjNecklace/>}
                                    {itemValue.type === 'twoHand' && itemValue.objType === 'axe' && <ObjAxe/>}
                                    {itemValue.type === 'twoHand' && itemValue.objType === 'staff' && <ObjStaff/>}
                                    {itemValue.type === 'twoHand' && itemValue.objType === 'lance' && <ObjLance/>}
                                    {itemValue.type === 'potion' && <ObjPotion/>}
                                    {itemValue.type === 'secondHand' && itemValue.objType === 'knife' && <ObjKnife/>}
                                    {itemValue.type === 'none' && <ObjNone/>}
                                </div>
                            </td>
                            <td className="maximize">{itemValue.name}</td>
                        </tr>
                    </tbody>
                </table>
                <button className="collect-button" onClick={saveRewardFunc}>* Collect *</button>
            </div>
        </React.Fragment>
    );
}