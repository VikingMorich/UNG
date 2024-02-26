import React, {useState, useEffect, useRef} from 'react';
import { useTranslation } from "react-i18next"
import { ObjHelmet, ObjNone, ObjBoots, ObjSword, ObjShield, ObjRing, ObjNecklace, ObjArmor, ObjCrossbow, ObjSpellBook } from './icon/objectIcon'
import { itemsList } from '../api/gameDatabase'
import { getCurrentGold, buyObj } from "../api/gameFunctions";
import ObjInspector from './ObjInspector'

export default function Shop() {
    const [t, i18n] = useTranslation("global")
    const [currentGold, setCurrentGold] = useState(0);
    const [openDetails, setOpenDetails] = useState(false)
    const [openObjInspector, setOpenObjInspector] = useState(false)
    const [objClicked, setObjClicked] = useState(null)
    const goToGame = () => window.location = '/game'
    let mappedItems = Object.keys(itemsList).map(el => {
        return itemsList[el].map(ele => ele)
    }).flat(1)
    const ref = useRef(null)

    useEffect(() => {
        getCurrentGold().then((value) => setCurrentGold(value.val()))
    }, []);

    const closeDetailsFunc = () => {
        setOpenDetails(false)
    }

    const closeObjInspector = () => {
        setOpenObjInspector(false)
    }

    const inspectObjFunc = () => {
        closeDetailsFunc()
        setOpenObjInspector(true)
    }

    const buyObjFunc = () => {
        closeDetailsFunc()
        buyObj(objClicked)
    }

    const openDetailsFunc = (ev) => {
        setOpenDetails(true)
        let clickedPos = ev.currentTarget.getElementsByClassName('maximize')[0].getBoundingClientRect()
        let docPos = document.body.getBoundingClientRect()
        
        let top = clickedPos.bottom - docPos.top + 'px'
        let left = clickedPos.left - docPos.left + 'px'
          
        let detailsOp = ref.current
        detailsOp.style.top = top
        detailsOp.style.left = left

        //TO DO
        let id = ev.currentTarget.id
        setObjClicked(id)
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                closeDetailsFunc()
                setObjClicked(null)
                closeObjInspector()
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
    }

    useOutsideAlerter(ref);
    
    return (
        <React.Fragment>
            <h1>* Shop *</h1>
            <div className='c-shop'>
                <div className='shop-options'>
                    <ul className='ul-list'>
                        <li className='link' onClick={goToGame}>* Back *</li>
                    </ul>
                    <table>
                        <tbody>
                            {mappedItems.map(el => {
                                return <tr key={el.name} id={el.name} className={currentGold < el.gold ? 'disabled' : ''} onClick={openDetailsFunc}>
                                    <td>∞</td>
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
                                            {el.type === 'none' && <ObjNone/>}
                                        </div>
                                    </td>
                                    <td className='maximize'>{el.name}</td>
                                    <td>{el.gold}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <div ref={ref} className={`option-details ${openDetails ? '' : 'disabled'}`}>
                    <div className='option-wrapper' onClick={inspectObjFunc}>
                        <span>* Inspect *</span>
                    </div>
                    {objClicked && currentGold > (mappedItems.find(el => el.name === objClicked).gold) &&
                    <div className='option-wrapper' onClick={buyObjFunc}>
                        <span>* Buy *</span>
                    </div>}
                </div>
                {openObjInspector && objClicked &&
                    <ObjInspector obj={mappedItems.find(el => el.name === objClicked)}/>
                }
                <div className='shop-img'>
                    <img alt="shop" src="./shop.png" />
                </div>
            </div>
            <div id="player" className="user-hud">
                
            </div>
        </React.Fragment>
    );
}