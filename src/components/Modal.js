import React, {useState, useEffect, useRef} from 'react';
import cross from '../icons/clear-black-18dp.svg'
import { useTranslation } from "react-i18next"
import { Helmet, Shield, Sword, Armor, Ring, Shoes, Pendant } from './icon/icon'
import { ObjHelmet, ObjNone, ObjBoots, ObjSword, ObjShield, ObjRing, ObjNecklace, ObjArmor } from './icon/objectIcon'
import { deleteObj, equipObj, unequipObj } from '../api/gameFunctions'


export default function Modal(props) {
    const [t] = useTranslation("global")
    const [openDetails, setOpenDetails] = useState(false)
    const [objClicked, setObjClicked] = useState(null)
    const ref = useRef(null)
    const refModal = useRef(null)
    let equipedItems = props.state && props.state.gameStates.backpack ? Object.keys(props.state.gameStates.backpack).filter(el => {
        return props.state.gameStates.backpack[el].equiped
    }).map(elem => {
        return {
            key: elem,
            state: props.state.gameStates.backpack[elem]
        }
    }) : []
    let otherItems = props.state && props.state.gameStates.backpack ? Object.keys(props.state.gameStates.backpack).filter(el => {
        return (!props.state.gameStates.backpack[el].equiped || (props.state.gameStates.backpack[el].equiped && props.state.gameStates.backpack[el].count > 1))
    }).map(elem => {
        let elemState = {...props.state.gameStates.backpack[elem]}
        if (props.state.gameStates.backpack[elem].equiped) {
            elemState.count -= 1
        }
        return {
            key: elem,
            state: elemState
        }
    }) : []

    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                closeDetailsFunc()
                setObjClicked(null)
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

    const openDetailsFunc = (ev) => {
        if (ev.currentTarget.textContent !== '-') {
            setOpenDetails(true)
            let clickedPos = ev.currentTarget.getBoundingClientRect()
            let modalPos = refModal.current.getBoundingClientRect()
            
            let top = clickedPos.bottom - modalPos.top + 'px'
            let left = clickedPos.left - modalPos.left + 'px'
              
            let detailsOp = ref.current
            detailsOp.style.top = top
            detailsOp.style.left = left

            //TO DO
            let id = ev.currentTarget.id
            setObjClicked(id)
        }
    }
    const closeDetailsFunc = () => {
        setOpenDetails(false)
    }
    const deleteObjFunc = () => {
        deleteObj(objClicked)
    }

    const equipObjFunc = () => {
        equipObj(objClicked)
    }

    const unequipObjFunc = () => {
        unequipObj(objClicked)
    }

    const saveSkillChanges = () => {

    }

    return (
        <React.Fragment>
            {props.open &&
            <div className="c-modal-background">
                <div ref={refModal} className="c-modal">
                    <img className="c-modal--cross" alt="menu-icon" src={cross} onClick={props.toggleModal}/>
                    {props.type === 'privacy' && 
                        <React.Fragment>
                            <div className="c-modal--content">
                                <h1>{t('privacy.title')}</h1>
                                <p>{t('privacy.p1')}</p>
                                <h3>{t('privacy.h5')}</h3>
                                <p>{t('privacy.p6')}</p>
                                <h3>{t('privacy.h2')}</h3>
                                <p>{t('privacy.p3')}</p>
                                <h3>{t('privacy.h1')}</h3>
                                <p>{t('privacy.p2')}</p>
                                <h3>{t('privacy.h3')}</h3>
                                <p>{t('privacy.p4')}</p>
                                <h3>{t('privacy.h4')}</h3>
                                <p>{t('privacy.p5')}</p>
                            </div>
                        </React.Fragment>
                    }
                    {
                        props.type === 'inventory' && 
                        <React.Fragment>
                            <div className="c-modal--inventory">
                                <h1>* INVENTORY *</h1>
                                <div className="user-statistics">
                                    <div className="char-stat">
                                        <span>💪🏻</span>
                                        <span>{props.state.gameStates.FUE}</span>
                                    </div>
                                    <div className="char-stat">
                                        <span>🧠</span>
                                        <span>{props.state.gameStates.INT}</span>
                                    </div>
                                    <div className="char-stat">
                                        <span>👁️</span>
                                        <span>{props.state.gameStates.PUN}</span>
                                    </div>
                                    <div className="char-stat">
                                        <span>🍀</span>
                                        <span>{props.state.gameStates.SUE}</span>
                                    </div>
                                    <div className="char-stat">
                                        <span>⚔️</span>
                                        <span>{props.state.gameStates.ATK}</span>
                                    </div>
                                    <div className="char-stat">
                                        <span>🛡️</span>
                                        <span>{props.state.gameStates.DEF}</span>
                                    </div>
                                    <div className="char-stat">
                                        <span>💰</span>
                                        <span>{props.state.gameStates.gold}</span>
                                    </div>
                                </div>
                                <table className='pj-table'>
                                    <tbody>
                                        <tr>
                                            <td className='char-icon'>
                                                <Sword />
                                            </td>
                                            <td id={equipedItems.find(el => el.state.type === 'firstHand') ? equipedItems.find(el => el.state.type === 'firstHand').key : ''} onClick={openDetailsFunc}>{equipedItems.find(el => el.state.type === 'firstHand') ? equipedItems.find(el => el.state.type === 'firstHand').state.name : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className='char-icon'>
                                                <Shield />
                                            </td>
                                            <td id={equipedItems.find(el => el.state.type === 'secondHand') ? equipedItems.find(el => el.state.type === 'secondHand').key : ''} onClick={openDetailsFunc}>{equipedItems.find(el => el.state.type === 'secondHand') ? equipedItems.find(el => el.state.type === 'secondHand').state.name : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className='char-icon'>
                                                <Helmet />
                                            </td>
                                            <td id={equipedItems.find(el => el.state.type === 'helmet') ? equipedItems.find(el => el.state.type === 'helmet').key : ''} onClick={openDetailsFunc}>{equipedItems.find(el => el.state.type === 'helmet') ? equipedItems.find(el => el.state.type === 'helmet').state.name : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className='char-icon'>
                                                <Armor />
                                            </td>
                                            <td id={equipedItems.find(el => el.state.type === 'armor') ? equipedItems.find(el => el.state.type === 'armor').key : ''} onClick={openDetailsFunc}>{equipedItems.find(el => el.state.type === 'armor') ? equipedItems.find(el => el.state.type === 'armor').state.name : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className='char-icon'>
                                                <Shoes />
                                            </td>
                                            <td id={equipedItems.find(el => el.state.type === 'boots') ? equipedItems.find(el => el.state.type === 'boots').key : ''} onClick={openDetailsFunc}>{equipedItems.find(el => el.state.type === 'boots') ? equipedItems.find(el => el.state.type === 'boots').state.name : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className='char-icon'>
                                                <Ring />
                                            </td>
                                            <td id={equipedItems.find(el => el.state.type === 'ring') ? equipedItems.find(el => el.state.type === 'ring').key : ''} onClick={openDetailsFunc}>{equipedItems.find(el => el.state.type === 'ring') ? equipedItems.find(el => el.state.type === 'ring').state.name : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className='char-icon'>
                                                <Pendant />
                                            </td>
                                            <td id={equipedItems.find(el => el.state.type === 'necklace') ? equipedItems.find(el => el.state.type === 'necklace').key : ''} onClick={openDetailsFunc}>{equipedItems.find(el => el.state.type === 'necklace') ? equipedItems.find(el => el.state.type === 'necklace').state.name : '-'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='obj-list'>
                                    <span>* Backpack *</span>
                                    <table className='pj-table'>
                                        <tbody>
                                            {otherItems.map((element) => {
                                                return <tr key={element.key}>
                                                    <td>{element.state.count}</td>
                                                    <td>
                                                        <div className='icon-container'>
                                                            {props.state.gameStates.backpack[element.key].type === 'helmet' && <ObjHelmet/>}
                                                            {props.state.gameStates.backpack[element.key].type === 'boots' && <ObjBoots/>}
                                                            {props.state.gameStates.backpack[element.key].type === 'firstHand' && props.state.gameStates.backpack[element.key].objType === 'sword' && <ObjSword/>}
                                                            {props.state.gameStates.backpack[element.key].type === 'secondHand' && props.state.gameStates.backpack[element.key].objType === 'shield' && <ObjShield/>}
                                                            {props.state.gameStates.backpack[element.key].type === 'armor' && <ObjArmor/>}
                                                            {props.state.gameStates.backpack[element.key].type === 'ring' && <ObjRing/>}
                                                            {props.state.gameStates.backpack[element.key].type === 'necklace' && <ObjNecklace/>}
                                                            {props.state.gameStates.backpack[element.key].type === 'none' && <ObjNone/>}
                                                        </div>
                                                    </td>
                                                    <td className="maximize" id={element.key} onClick={openDetailsFunc} >{props.state.gameStates.backpack[element.key].name}</td>
                                                </tr>;
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div ref={ref} className={`option-details ${openDetails ? '' : 'disabled'}`}>
                                    {objClicked && (props.state.gameStates.backpack[objClicked].type === 'helmet' || props.state.gameStates.backpack[objClicked].type === 'boots' || props.state.gameStates.backpack[objClicked].type === 'armor' || props.state.gameStates.backpack[objClicked].type === 'firstHand' || props.state.gameStates.backpack[objClicked].type === 'ring' || props.state.gameStates.backpack[objClicked].type === 'necklace' || props.state.gameStates.backpack[objClicked].type === 'secondHand')&& 
                                        (props.state.gameStates.backpack[objClicked].equiped ? 
                                            <div className='option-wrapper' onClick={unequipObjFunc}>
                                                <span>* Unequip *</span>
                                            </div>
                                            : 
                                            <div className='option-wrapper' onClick={equipObjFunc}>
                                                <span>* Equip *</span>
                                            </div>
                                            )
                                    }
                                    <div className='option-wrapper' onClick={deleteObjFunc}>
                                        <span>* Delete *</span>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    }
                    {
                        props.type === 'skills' && 
                        <React.Fragment>
                            <div className="c-modal--skills">
                                <h1>* SKILLS *</h1>
                                <div className='points-wrapper'>
                                    <span>* Skill points: </span>
                                    <span>{props.state.gameStates.skillPoints || 0}</span>
                                </div>
                                
                                <div className="button" onClick={saveSkillChanges}>
                                    <span>* SAVE *</span>
                                </div>
                            </div>
                        </React.Fragment>
                    }
                    {
                        props.type === 'map' && 
                        <React.Fragment>
                            <div className="c-modal--map">
                                <h1>* MAPA *</h1>
                                <img className='map-view' alt="map" src="./map1.jpg" />
                            </div>
                        </React.Fragment>
                    }
                    {
                        props.type === 'character' && 
                        <React.Fragment>
                            <div className="c-modal--character">
                                <h1>* CHARACTER *</h1>
                                <div className='char-wrapp'>
                                    <img className='char-img' alt="character" src={props.state.gameStates.characterType === 'mage' ? '/mage1.jpeg' : props.state.gameStates.characterType === 'warrior' ? '/warrior1.jpeg' : '/archer1.jpeg'} />
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td colspan="2">
                                                    <span>* Name:</span>
                                                    <span>{props.state.username}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>💪🏻</span>
                                                    <span>{props.state.gameStates.FUE}</span>
                                                </td>
                                                <td>
                                                    <span>🧠</span>
                                                    <span>{props.state.gameStates.INT}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>👁️</span>
                                                    <span>{props.state.gameStates.PUN}</span>
                                                </td>
                                                <td>
                                                    <span>🍀</span>
                                                    <span>{props.state.gameStates.SUE}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </React.Fragment>
                    }
                </div>
            </div>
            }
        </React.Fragment>
    );
}