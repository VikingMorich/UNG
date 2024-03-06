import React, {useState, useEffect} from 'react';
import { useTranslation } from "react-i18next"
import { getGameStates } from '../api/gameFunctions'
import { SecondHand, TwoHands } from './icon/icon'


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
            let obj = equipedItems.find(el => el.state.type === t && props.obj.name !== el.state.name) || null
            if (!obj && t === 'twoHand') {
                t = 'firstHand'
                obj = equipedItems.find(el => el.state.type === t && props.obj.name !== el.state.name) || null
                if (!obj) {
                    t = 'secondHand'
                    obj = equipedItems.find(el => el.state.type === t && props.obj.name !== el.state.name) || null
                }
            } else if (!obj && (t === 'firstHand' || t === 'secondHand')) {
                t = 'twoHand'
                obj = equipedItems.find(el => el.state.type === t && props.obj.name !== el.state.name) || null
            }
            if (obj) {
                setObjCompare(obj.state)
            }
        })
    }, [props.obj]);

    return (
        <React.Fragment>
            <div className="c-inspector-background">
                {!objCompare && 
                <div className="c-inspector--content">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <h2>{props.obj.name}</h2>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ position: 'relative'}}>
                                    <img className="item-img" src={props.obj.imgSrc} alt="item"/>
                                    {props.obj.stateUsed &&
                                    <div className='used-state'>
                                        <span>{props.obj.stateUsed === 'FUE' ? '💪🏻' : props.obj.stateUsed === 'INT' ? '🧠' : props.obj.stateUsed === 'PUN' ? '👁️' : '🍀'}</span>
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
                                    <span>{props.obj.description}</span>
                                </td>
                            </tr>
                            <tr className='maximize'>
                                {props.obj.stats && 
                                <td>
                                    <span>* Stats: </span>
                                    <ul>
                                        {props.obj.stats.DEF && <li>*DEF: {props.obj.stats.DEF}</li>}
                                        {props.obj.stats.ATK && <li>*ATK: {props.obj.stats.ATK}</li>}
                                        {props.obj.stats.use && <li>{props.obj.stats.use}</li>}
                                    </ul>
                                </td>
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
                }
                {objCompare && 
                <React.Fragment>
                <div className="c-inspector--double-left">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <h2>{props.obj.name}</h2>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ position: 'relative'}}>
                                    <img className="item-img" src={props.obj.imgSrc} alt="item"/>
                                    {props.obj.stateUsed &&
                                    <div className='used-state'>
                                        <span>{props.obj.stateUsed === 'FUE' ? '💪🏻' : props.obj.stateUsed === 'INT' ? '🧠' : props.obj.stateUsed === 'PUN' ? '👁️' : '🍀'}</span>
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
                                    <span>{props.obj.description}</span>
                                </td>
                            </tr>
                            <tr className='maximize'>
                                <td>
                                    <span>* Stats: </span>
                                    <ul>
                                        {props.obj.stats.DEF && <li>*DEF: {props.obj.stats.DEF}</li>}
                                        {props.obj.stats.ATK && <li>*ATK: {props.obj.stats.ATK}</li>}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="c-inspector--double-top-right">
                    <span>* EQUIPED *</span>
                </div>
                <div className="c-inspector--double-right">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <h2>{objCompare.name}</h2>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ position: 'relative'}}>
                                <img className="item-img" src={objCompare.imgSrc} alt="item"/>
                                {objCompare.stateUsed &&
                                <div className='used-state'>
                                    <span>{objCompare.stateUsed === 'FUE' ? '💪🏻' : objCompare.stateUsed === 'INT' ? '🧠' : objCompare.stateUsed === 'PUN' ? '👁️' : '🍀'}</span>
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
                                <span>{objCompare.description}</span>
                            </td>
                        </tr>
                        <tr className='maximize'>
                            <td>
                                <span>* Stats: </span>
                                <ul>
                                    {objCompare.stats.DEF && <li>*DEF: {objCompare.stats.DEF}</li>}
                                    {objCompare.stats.ATK && <li>*ATK: {objCompare.stats.ATK}</li>}
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