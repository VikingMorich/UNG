import React from 'react';
import { useTranslation } from "react-i18next"
import { getRandomInt, saveReward } from '../api/gameFunctions'
import { ObjBoots, ObjCoins } from './icon/objectIcon';
import { itemsList } from '../api/gameDatabase'

export default function Reward() {
    const [t, i18n] = useTranslation("global")
    //const goToGame = () => window.location = '/game'
    const coinsValue = getRandomInt(100)
    const saveRewardFunc = () => {
        saveReward(coinsValue, itemValue)
    }
    const getRandomBoots = () => {
        return itemsList.boots[getRandomInt(itemsList.boots.length)]
    }
    const itemValue = getRandomBoots()
    
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
                                    <ObjBoots />
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