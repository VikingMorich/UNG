import React, {useState, useEffect, useRef} from 'react';
import { useTranslation } from "react-i18next"
import { ObjHelmet, ObjNone, ObjBoots, ObjSword, ObjShield, ObjRing, ObjNecklace, ObjArmor, ObjCrossbow, ObjSpellBook, ObjKnife, ObjPotion, ObjAxe, ObjLance, ObjStaff } from './icon/objectIcon'
import { itemsList } from '../api/gameDatabase'
import { buyObj, setHistoryPage } from "../api/gameFunctions";
import ObjInspector from './ObjInspector'
import Counter from './Counter'
import { BuyIcon, InspectIcon } from './icon/icon'
import { Tooltip as ReactTooltip } from 'react-tooltip'

export default function ShopList(props) {
    const [t, i18n] = useTranslation("global")
    const [openObjInspector, setOpenObjInspector] = useState(false)
    const [objClicked, setObjClicked] = useState(null)
    const goToGame = () => window.location = '/game'
    let mappedItems = Object.keys(itemsList).map(el => {
        return itemsList[el].map(ele => ele)
    }).flat(1)
    if (props.values) {
        mappedItems = mappedItems.filter(el => props.values.items.find(x => x.name === el.name) )
    }
    const [counterArray, setCounterArray] = useState(mappedItems.map(() => 1))
    const [maxCounterArray] = useState(mappedItems.map(el => {
        if (props.state.gameStates.shop && props.state.gameStates.shop.find(x => x.name === el.name))
            return props.state.gameStates.shop.find(x => x.name === el.name).count
        else {
            return 666
        }
    }))
    const decrement = (index) => {
        if ((counterArray[index] - 1) > 0) {
            let newCounterArray = [...counterArray]
            newCounterArray[index] = newCounterArray[index] - 1
            setCounterArray(newCounterArray)
        }
    }

    const increment = (index) => {
        let newCounterArray = [...counterArray]
        if (props.values && newCounterArray[index] < maxCounterArray[index]) {
            newCounterArray[index] = newCounterArray[index] + 1
            setCounterArray(newCounterArray)
        }
    }

    const buyObjFunc = (obj, i) => {
        if (props.state.gameStates.gold > (counterArray[i] * obj.gold)) {
            buyObj(obj.name, counterArray[i])
        }
    }

    const ref = useRef(null)

    const closeObjInspector = () => {
        setOpenObjInspector(false)
    }

    const inspectObjFunc = () => {
        setOpenObjInspector(true)
    }

    const openDetailsFunc = (ev) => {
        //TO DO
        let id = ev.currentTarget.id
        setObjClicked(id)
    }

    function useOutsideAlerter() {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside() {
                setObjClicked(null)
                closeObjInspector()
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, []);
    }

    useOutsideAlerter(ref);
    
    return (
        <React.Fragment>
            <div className='c-shop'>
                <div className='shop-options'>
                    <div className='table-wrapper'>
                        <table>
                            <tbody>
                                {mappedItems.map((el, i) => {
                                    return <tr key={el.name} id={el.name} className={((props.state.gameStates.gold < (counterArray[i] * el.gold) || maxCounterArray[i] === 0)) ? 'disabled' : ''} onClick={openDetailsFunc}>
                                        <td>{maxCounterArray[i]}</td>
                                        <td>
                                            <div className='icon-container'>
                                                {el.type === 'helmet' && <ObjHelmet/>}
                                                {el.type === 'boots' && <ObjBoots/>}
                                                {el.type === 'firstHand' && el.objType === 'sword' && <ObjSword/>}
                                                {el.type === 'firstHand' && el.objType === 'book' && <ObjSpellBook/>}
                                                {el.type === 'firstHand' && el.objType === 'crossbow' && <ObjCrossbow/>}
                                                {el.type === 'secondHand' && el.objType === 'shield' && <ObjShield/>}
                                                {el.type === 'armor' && <ObjArmor/>}
                                                {el.type === 'ring' && <ObjRing/>}
                                                {el.type === 'necklace' && <ObjNecklace/>}
                                                {el.type === 'twoHand' && el.objType === 'axe' && <ObjAxe/>}
                                                {el.type === 'twoHand' && el.objType === 'staff' && <ObjStaff/>}
                                                {el.type === 'twoHand' && el.objType === 'lance' && <ObjLance/>}
                                                {el.type === 'potion' && <ObjPotion/>}
                                                {el.type === 'secondHand' && el.objType === 'knife' && <ObjKnife/>}
                                                {el.type === 'none' && <ObjNone/>}
                                            </div>
                                        </td>
                                        <td className='maximize'>{el.name}</td>
                                        <td><Counter counter={counterArray[i]} increment={() => {increment(i)}} decrement={() => {decrement(i)}}/></td>
                                        <td>
                                            <div className='buttons-wrap'>
                                                <div className={`button-icon ${props.state.gameStates.gold < (counterArray[i] * el.gold) ? 'disabled' : ''}`} onClick={() => {if(maxCounterArray[i] !== 0) {buyObjFunc(el, i)}}} data-tooltip-id="tooltip-shop" data-tooltip-html={'* Buy *'}>
                                                    <BuyIcon />
                                                </div>
                                                <div className='button-icon' onClick={inspectObjFunc} data-tooltip-id="tooltip-shop" data-tooltip-html={'* Inspect *'}>
                                                    <InspectIcon />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{counterArray[i] * el.gold}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <ReactTooltip id="tooltip-shop" place="top" type="dark" effect="float" className='font-tooltip'/>
                    </div>
                    {props.values && <ul className='ul-list'>
                        <li className='link' onClick={() => setHistoryPage(props.values.end)}>Terminar compras</li>
                    </ul>}
                </div>
                {openObjInspector && objClicked &&
                    <ObjInspector obj={mappedItems.find(el => el.name === objClicked)}/>
                }
                <div className='shop-img'>
                    <img alt="shop" src="./locations/shop.png" />
                </div>
            </div>
        </React.Fragment>
    );
}