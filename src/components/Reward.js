import React from 'react';
import { useTranslation } from "react-i18next"
import { saveReward, setHistoryPage } from '../api/gameFunctions'
import { ObjBoots, ObjCoins, ObjHelmet, ObjSword, ObjNone, ObjShield, ObjRing, ObjNecklace, ObjArmor, ObjCrossbow, ObjSpellBook, ObjKnife, ObjPotion, ObjAxe, ObjLance, ObjStaff} from './icon/objectIcon';
import { itemsList } from '../api/gameDatabase'

export default function Reward(props) {
    const [t] = useTranslation("global")
    //const goToGame = () => window.location = '/game'
    // const coinsValue = props.values.items.find(el => el.type === 'coins').count || null
    const saveRewardFunc = () => {
        saveReward(props.values.items)
        setHistoryPage(props.values.next)
    }
    let mappedItems = Object.keys(itemsList).map(el => {
        return itemsList[el].map(ele => ele)
    }).flat(1)
    if (props.values) {
        mappedItems = mappedItems.filter(el => props.values.items.find(x => x.name === el.name) )
    }
    
    return (
        <React.Fragment>
            <div className='reward-view'>
                <h2>{t('reward.title')}</h2>
                <img className="background-img" alt="chest" src='./chest.jpg' />
                <table className='reward-table'>
                    <tbody>
                        {props.values.items.map(el => {
                            return (
                                <tr key={el.name}>
                                    <td>{el.count}</td>
                                    <td>
                                        <div className='icon-container'>
                                            {el.type === 'coins' && <ObjCoins />}
                                            {mappedItems.find(i => i.name === el.name)?.type === 'helmet' && <ObjHelmet/>}
                                            {mappedItems.find(i => i.name === el.name)?.type === 'boots' && <ObjBoots/>}
                                            {mappedItems.find(i => i.name === el.name)?.type === 'firstHand' && mappedItems.find(i => i.name === el.name)?.objType === 'sword' && <ObjSword/>}
                                            {mappedItems.find(i => i.name === el.name)?.type === 'firstHand' && mappedItems.find(i => i.name === el.name)?.objType === 'book' && <ObjSpellBook/>}
                                            {mappedItems.find(i => i.name === el.name)?.type === 'firstHand' && mappedItems.find(i => i.name === el.name)?.objType === 'crossbow' && <ObjCrossbow/>}
                                            {mappedItems.find(i => i.name === el.name)?.type === 'secondHand' && mappedItems.find(i => i.name === el.name)?.objType === 'shield' && <ObjShield/>}
                                            {mappedItems.find(i => i.name === el.name)?.type === 'armor' && <ObjArmor/>}
                                            {mappedItems.find(i => i.name === el.name)?.type === 'ring' && <ObjRing/>}
                                            {mappedItems.find(i => i.name === el.name)?.type === 'necklace' && <ObjNecklace/>}
                                            {mappedItems.find(i => i.name === el.name)?.type === 'twoHand' && mappedItems.find(i => i.name === el.name)?.objType === 'axe' && <ObjAxe/>}
                                            {mappedItems.find(i => i.name === el.name)?.type === 'twoHand' && mappedItems.find(i => i.name === el.name)?.objType === 'staff' && <ObjStaff/>}
                                            {mappedItems.find(i => i.name === el.name)?.type === 'twoHand' && mappedItems.find(i => i.name === el.name)?.objType === 'lance' && <ObjLance/>}
                                            {mappedItems.find(i => i.name === el.name)?.type === 'potion' && <ObjPotion/>}
                                            {mappedItems.find(i => i.name === el.name)?.type === 'secondHand' && mappedItems.find(i => i.name === el.name)?.objType === 'knife' && <ObjKnife/>}
                                            {mappedItems.find(i => i.name === el.name)?.type === 'none' && <ObjNone/>}
                                        </div>
                                    </td>
                                    <td className="maximize">{el.type === 'coins' ? t('battle.'+props.values.items.find(el => el.type === 'coins').name) : t('items.'+mappedItems.find(i => i.name === el.name).name)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button className="collect-button" onClick={saveRewardFunc}>{t('reward.collect')}</button>
            </div>
        </React.Fragment>
    );
}