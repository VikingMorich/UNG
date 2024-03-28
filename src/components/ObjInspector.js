import React, {useState, useEffect} from 'react';
import { useTranslation } from "react-i18next"
import { getGameStates } from '../api/gameFunctions'
import { SecondHand, TwoHands, BasicStrength, BasicBrain, BasicDex, BasicLuck } from './icon/icon'


export default function ObjInspector(props) {
    const [t] = useTranslation("global")
    const [objCompare, setObjCompare] = useState(null);

    useEffect(() => {
        getGameStates().then((value) => {
            let states = value.val()
            let equipedItems = states.backpack ? Object.keys(states.backpack).filter(el => {
                return states.backpack[el].equiped
            }).map(elem => {
                return {
                    key: elem,
                    state: states.backpack[elem]
                }
            }) : []
            let t = props.obj.type
            let obj = equipedItems.find(el => el.state.type === t) || null
            if (!obj && t === 'twoHand') {
                t = 'firstHand'
                obj = equipedItems.find(el => el.state.type === t) || null
                if (!obj) {
                    t = 'secondHand'
                    obj = equipedItems.find(el => el.state.type === t) || null
                }
            } else if (!obj && (t === 'firstHand' || t === 'secondHand')) {
                t = 'twoHand'
                obj = equipedItems.find(el => el.state.type === t) || null
            }
            if (obj) {
                setObjCompare(obj.state)
            }
        })
    }, [props.obj]);

    return (
        <React.Fragment>
            <div className="c-inspector-background">
                {(props.obj.equiped || (objCompare && objCompare.name === props.obj.name)) &&
                    <div className="c-inspector--centered">
                        <span>{t('user-hud.equiped')}</span>
                    </div>
                }
                {(!objCompare || objCompare.name === props.obj.name) && 
                <div className="c-inspector--content">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <h2>{t('items.'+props.obj.name)}</h2>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ position: 'relative'}}>
                                    <img className="item-img" src={props.obj.imgSrc} alt="item"/>
                                    {props.obj.stateUsed &&
                                    <div className='used-state'>
                                        <div className='img-icon'>
                                            {props.obj.stateUsed === 'FUE' ? <BasicStrength /> : props.obj.stateUsed === 'INT' ? <BasicBrain/> : props.obj.stateUsed === 'PUN' ? <BasicDex/> : <BasicLuck/>}
                                        </div>
                                    </div>
                                    }
                                    {props.obj.type === 'secondHand' &&
                                    <div className='special-state'>
                                        <div className='img-icon'>
                                            <SecondHand />
                                        </div>
                                    </div>
                                    }
                                    {props.obj.type === 'twoHand' &&
                                    <div className='special-state'>
                                        <div className='img-icon'>
                                            <TwoHands />
                                        </div>
                                    </div>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>{t('items.'+props.obj.description)}</span>
                                </td>
                            </tr>
                            <tr className='maximize'>
                                {props.obj.stats && 
                                <td>
                                    <span>{t('items.stats')}</span>
                                    <ul>
                                        {props.obj.stats.DEF && <li>{t('items.def')}{props.obj.stats.DEF}</li>}
                                        {props.obj.stats.ATK && <li>{t('items.atk')}{props.obj.stats.ATK}</li>}
                                        {/* {props.obj.stats.use && <li>{props.obj.stats.use}</li>} */}
                                    </ul>
                                </td>
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
                }
                {objCompare && props.obj.name !== objCompare.name && 
                <React.Fragment>
                <div className="c-inspector--double-left">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <h2>{t('items.'+props.obj.name)}</h2>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ position: 'relative'}}>
                                    <img className="item-img" src={props.obj.imgSrc} alt="item"/>
                                    {props.obj.stateUsed &&
                                    <div className='used-state'>
                                        <div className='img-icon'>
                                            {props.obj.stateUsed === 'FUE' ? <BasicStrength /> : props.obj.stateUsed === 'INT' ? <BasicBrain/> : props.obj.stateUsed === 'PUN' ? <BasicDex/> : <BasicLuck/>}
                                        </div>
                                    </div>
                                    }
                                    {props.obj.type === 'secondHand' &&
                                    <div className='special-state'>
                                        <div className='img-icon'>
                                            <SecondHand />
                                        </div>
                                    </div>
                                    }
                                    {props.obj.type === 'twoHand' &&
                                    <div className='special-state'>
                                        <div className='img-icon'>
                                            <TwoHands />
                                        </div>
                                    </div>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>{t('items.'+props.obj.description)}</span>
                                </td>
                            </tr>
                            <tr className='maximize'>
                                <td>
                                    <span>{t('items.stats')}</span>
                                    <ul>
                                        {props.obj.stats.DEF && <li>{t('items.def')}{props.obj.stats.DEF}</li>}
                                        {props.obj.stats.ATK && <li>{t('items.atk')}{props.obj.stats.ATK}</li>}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="c-inspector--double-top-right">
                    <span>{t('user-hud.equiped')}</span>
                </div>
                <div className="c-inspector--double-right">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <h2>{t('items.'+objCompare.name)}</h2>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ position: 'relative'}}>
                                <img className="item-img" src={objCompare.imgSrc} alt="item"/>
                                {objCompare.stateUsed &&
                                <div className='used-state'>
                                    <div className='img-icon'>
                                            {objCompare.stateUsed === 'FUE' ? <BasicStrength /> : objCompare.stateUsed === 'INT' ? <BasicBrain/> : objCompare.stateUsed === 'PUN' ? <BasicDex/> : <BasicLuck/>}
                                        </div>
                                </div>
                                }
                                {objCompare.type === 'secondHand' &&
                                    <div className='special-state'>
                                        <div className='img-icon'>
                                            <SecondHand />
                                        </div>
                                    </div>
                                }
                                {objCompare.type === 'twoHand' &&
                                <div className='special-state'>
                                    <div className='img-icon'>
                                        <TwoHands />
                                    </div>
                                </div>
                                    }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>{t('items.'+objCompare.description)}</span>
                            </td>
                        </tr>
                        <tr className='maximize'>
                            <td>
                                <span>{t('items.stats')}</span>
                                <ul>
                                    {objCompare.stats.DEF && <li>{t('items.def')}{objCompare.stats.DEF}</li>}
                                    {objCompare.stats.ATK && <li>{t('items.atk')}{objCompare.stats.ATK}</li>}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </React.Fragment>
                }
            </div>
        </React.Fragment>
    );
}