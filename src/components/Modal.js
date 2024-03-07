import React, {useState, useEffect, useRef} from 'react';
import cross from '../icons/clear-black-18dp.svg'
import { useTranslation } from "react-i18next"
import { Helmet, Shield, Sword, Armor, Ring, Shoes, Pendant } from './icon/icon'
import { ObjHelmet, ObjNone, ObjBoots, ObjSword, ObjShield, ObjRing, ObjNecklace, ObjArmor, ObjCrossbow, ObjSpellBook, ObjKnife, ObjPotion, ObjAxe, ObjLance, ObjStaff } from './icon/objectIcon'
import { deleteObj, equipObj, unequipObj, getSellPrice, sellObj, saveSkillPoints, useBackpackPotion } from '../api/gameFunctions'
import { skillsWarrior, skillsMage, skillsArcher } from '../api/gameDatabase'
import ObjInspector from './ObjInspector'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { setInventoryStateOpen } from '../fireSubscription'


export default function Modal(props) {
    const [t] = useTranslation("global")
    const [openDetails, setOpenDetails] = useState(false)
    const [openObjInspector, setOpenObjInspector] = useState(false)
    const [objClicked, setObjClicked] = useState(null)
    const [skillSelected, setSkillSelected] = useState([])
    const [currSkillPoints, setCurrSkillPoints] = useState(props.state?.gameStates?.skillPoints || 0)
    const [sellPrice, setSellPrice] = useState(null)
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
    let currentSkills = []
    if (props.state && props.state.gameStates && props.state.gameStates.characterType)
        currentSkills = props.state.gameStates.characterType === 'warrior' ? skillsWarrior : props.state.gameStates.characterType === 'mage' ? skillsMage : skillsArcher

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

    const sellObjFunc = () => {
        sellObj(objClicked, getSellPrice(props.state.gameStates.backpack[objClicked].name))
    }

    const inspectObjFunc = () => {
        closeDetailsFunc()
        setOpenObjInspector(true)
    }

    const closeObjInspector = () => {
        setOpenObjInspector(false)
    }

    const equipObjFunc = () => {
        equipObj(objClicked)
    }

    const unequipObjFunc = () => {
        unequipObj(objClicked)
    }
    const useUsePotion = () => {
        setInventoryStateOpen(false)
        useBackpackPotion(objClicked)
    }

    const saveSkillChanges = () => {
        setInventoryStateOpen(false)
        saveSkillPoints(skillSelected, props.state.gameStates.skillPoints - currSkillPoints)
    }
    const updateSelectSkill = (event) => {
        if (props.state.gameStates) {
        let x = event.currentTarget.id
        //currentSkills

        let listSkills = []
        Object.keys(currentSkills).map(el => {
            currentSkills[el].map(ele => {
                ele.children.map(elem => {
                    return listSkills.push({...elem, father: ele.name})
                })
                return listSkills.push(ele)
            })
            return listSkills
        })
        let itemCost = listSkills.find(el => el.name === x)?.skillPoints || 0
        let element = listSkills.find(el => el.name === x)
        if (skillSelected.indexOf(x) !== -1) {
            let val = [...skillSelected]
            if (element.children && skillSelected.indexOf(element.children[0].name) !== -1) {
                setCurrSkillPoints(currSkillPoints + element.children[0].skillPoints + itemCost)
                val.splice(skillSelected.indexOf(element.children[0].name), 1)
                val.splice(skillSelected.indexOf(x), 1)
                setSkillSelected(val)
            }
            else {
                setCurrSkillPoints(currSkillPoints + itemCost)
                val.splice(skillSelected.indexOf(x), 1)
                setSkillSelected(val)
            }
        }
        else {
            if (currSkillPoints >= itemCost && (!props.state.gameStates.learnedSkills || props.state.gameStates.learnedSkills.indexOf(element.name) === -1)) {
                if (listSkills.find(el => el.name === x)?.father && ((skillSelected.indexOf(listSkills.find(el => el.name === x)?.father) !== -1) || props.state.gameStates.learnedSkills.indexOf(listSkills.find(el => el.name === x)?.father) !== -1)) {
                    setCurrSkillPoints(currSkillPoints - itemCost)
                    let val = [...skillSelected]
                    val.push(x)
                    setSkillSelected(val)
                }
                else if (!listSkills.find(el => el.name === x)?.father) {
                    setCurrSkillPoints(currSkillPoints - itemCost)
                    let val = [...skillSelected]
                    val.push(x)
                    setSkillSelected(val)
                }
                
            }
            
        }
        }
        
    }
    useEffect(() => {
        if (objClicked && props.state && props.state.gameStates.backpack[objClicked]) {
            setSellPrice(getSellPrice(props.state.gameStates.backpack[objClicked].name))
        }
    }, [objClicked, props.state]);

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
                                            <td id={equipedItems.find(el => el.state.type === 'firstHand') ? equipedItems.find(el => el.state.type === 'firstHand').key : equipedItems.find(el => el.state.type === 'twoHand') ? equipedItems.find(el => el.state.type === 'twoHand').key : ''} onClick={openDetailsFunc}>{equipedItems.find(el => el.state.type === 'firstHand') ? equipedItems.find(el => el.state.type === 'firstHand').state.name : equipedItems.find(el => el.state.type === 'twoHand') ? equipedItems.find(el => el.state.type === 'twoHand').state.name : '-'}</td>
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
                                                            {props.state.gameStates.backpack[element.key].type === 'firstHand' && props.state.gameStates.backpack[element.key].objType === 'book' && <ObjSpellBook/>}
                                                            {props.state.gameStates.backpack[element.key].type === 'firstHand' && props.state.gameStates.backpack[element.key].objType === 'crossbow' && <ObjCrossbow/>}
                                                            {props.state.gameStates.backpack[element.key].type === 'secondHand' && props.state.gameStates.backpack[element.key].objType === 'shield' && <ObjShield/>}
                                                            {props.state.gameStates.backpack[element.key].type === 'armor' && <ObjArmor/>}
                                                            {props.state.gameStates.backpack[element.key].type === 'ring' && <ObjRing/>}
                                                            {props.state.gameStates.backpack[element.key].type === 'necklace' && <ObjNecklace/>}
                                                            {props.state.gameStates.backpack[element.key].type === 'twoHand' && props.state.gameStates.backpack[element.key].objType === 'axe' && <ObjAxe/>}
                                                            {props.state.gameStates.backpack[element.key].type === 'twoHand' && props.state.gameStates.backpack[element.key].objType === 'staff' && <ObjStaff/>}
                                                            {props.state.gameStates.backpack[element.key].type === 'twoHand' && props.state.gameStates.backpack[element.key].objType === 'lance' && <ObjLance/>}
                                                            {props.state.gameStates.backpack[element.key].type === 'potion' && <ObjPotion/>}
                                                            {props.state.gameStates.backpack[element.key].type === 'secondHand' && props.state.gameStates.backpack[element.key].objType === 'knife' && <ObjKnife/>}
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
                                    {objClicked && (props.state.gameStates.backpack[objClicked].type === 'helmet' || props.state.gameStates.backpack[objClicked].type === 'boots' || props.state.gameStates.backpack[objClicked].type === 'armor' || props.state.gameStates.backpack[objClicked].type === 'firstHand' || props.state.gameStates.backpack[objClicked].type === 'ring' || props.state.gameStates.backpack[objClicked].type === 'necklace' || props.state.gameStates.backpack[objClicked].type === 'secondHand' || props.state.gameStates.backpack[objClicked].type === 'twoHand') && 
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
                                    {objClicked && props.state.gameStates.backpack[objClicked].type === 'potion' &&
                                    <div className='option-wrapper' onClick={useUsePotion}>
                                        <span>* Use *</span>
                                    </div>
                                    }
                                    <div className='option-wrapper' onClick={inspectObjFunc}>
                                        <span>* Inspect *</span>
                                    </div>
                                    <div className='option-wrapper' onClick={deleteObjFunc}>
                                        <span>* Delete *</span>
                                    </div>
                                    {window.location.pathname === '/shop' && 
                                        <div className='option-wrapper' onClick={sellObjFunc}>
                                            <span>* Sell ({sellPrice}) *</span>
                                        </div>
                                    }
                                </div>
                                {openObjInspector && objClicked &&
                                    <ObjInspector obj={props.state.gameStates.backpack[objClicked] || null}/>
                                }
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
                                    <span>{currSkillPoints}</span>
                                </div>
                                <div className='skills-view'>
                                    <div className='skills-tree'>
                                        <h2>* PASIVES *</h2>
                                        <div className='skills-wrap'>
                                            {currentSkills.pasives.map(el => {
                                                return <div className='skill-tree'>
                                                    <div key={el.name} id={el.name} onClick={updateSelectSkill} className={`skill-ball ` + (skillSelected.indexOf(el.name) !== -1 ? ' selected' : '' ) + 
                                                    ((props.state.gameStates.learnedSkills && props.state.gameStates.learnedSkills.indexOf(el.name) !== -1) ? ' learned' : '') +
                                                    (el.skillPoints > currSkillPoints ? ' disabled' : '')
                                                    } data-tooltip-id="my-tooltip" data-tooltip-html={el.description + (el.countdown !== 0 ? ('</br>Countdown: ' + el.countdown ) : '') + '</br>Skill Points: ' + el.skillPoints}>
                                                        <span>{el.name}</span>
                                                    </div>
                                                    {el.children.length === 1 && <div className='vertical-separator'></div>}
                                                    {el.children.length === 2 && <React.Fragment>
                                                        <div className='short-vertical-separator'></div>
                                                        <div className='double-separator'></div>
                                                    </React.Fragment>}
                                                    <div className='second-lvl'>
                                                        {el.children.length > 0 && el.children.map(ele => {
                                                        return <React.Fragment>
                                                            <div key={ele.name} id={ele.name}  onClick={updateSelectSkill} className={`skill-ball ` + (skillSelected.indexOf(ele.name) !== -1 ? ' selected' : '' ) + 
                                                            ((props.state.gameStates.learnedSkills && props.state.gameStates.learnedSkills.indexOf(ele.name) !== -1) ? ' learned' : '') +
                                                            ((ele.skillPoints <= currSkillPoints && ((skillSelected.indexOf(el.name) !== -1) || (props.state.gameStates.learnedSkills && props.state.gameStates.learnedSkills.indexOf(el.name) !== -1))) ? '' : ' disabled')
                                                            } data-tooltip-id="my-tooltip" data-tooltip-html={ele.description + (ele.countdown !== 0 ? ('</br>Countdown: ' + ele.countdown ) : '') + '</br>Skill Points: ' + ele.skillPoints}>
                                                                <span>{ele.name}</span>
                                                            </div>
                                                        </React.Fragment>
                                                        })}
                                                    </div>
                                                </div>
                                            }) }
                                        </div>
                                    </div>
                                    <div className='skills-tree'>
                                        <h2>* COMBAT *</h2>
                                        <div className='skills-wrap'>
                                            {currentSkills.combat.map(el => {
                                                return <div className='skill-tree'>
                                                    <div key={el.name} id={el.name} onClick={updateSelectSkill} className={`skill-ball ` + (skillSelected.indexOf(el.name) !== -1 ? 'selected' : '' ) + 
                                                    ((props.state.gameStates.learnedSkills && props.state.gameStates.learnedSkills.indexOf(el.name) !== -1) ? ' learned' : '') +
                                                    (el.skillPoints > currSkillPoints ? ' disabled' : '')
                                                    } data-tooltip-id="my-tooltip" data-tooltip-html={'New attack: ' + el.description + (el.countdown !== 0 ? ('</br>Countdown: ' + el.countdown ) : '') + '</br>Skill Points: ' + el.skillPoints}>
                                                        <span>{el.name}</span>
                                                    </div>
                                                    
                                                    {el.children.length > 0 && el.children.map(ele => {
                                                    return <React.Fragment>
                                                        <div className='vertical-separator'></div>
                                                        <div key={ele.name} id={ele.name} onClick={updateSelectSkill} className={`skill-ball ` + (skillSelected.indexOf(ele.name) !== -1 ? 'selected' : '' ) + 
                                                        ((props.state.gameStates.learnedSkills && props.state.gameStates.learnedSkills.indexOf(ele.name) !== -1) ? ' learned' : '') + 
                                                        ((ele.skillPoints <= currSkillPoints && ((skillSelected.indexOf(el.name) !== -1) || (props.state.gameStates.learnedSkills && props.state.gameStates.learnedSkills.indexOf(el.name) !== -1))) ? '' : ' disabled')
                                                        } data-tooltip-id="my-tooltip" data-tooltip-html={'New attack: ' + ele.description + (ele.countdown !== 0 ? ('</br>Countdown: ' + ele.countdown ) : '') + '</br>Skill Points: ' + ele.skillPoints}>
                                                            <span>{ele.name}</span>
                                                        </div>
                                                    </React.Fragment>
                                                    })}
                                                    </div>
                                            }) }
                                        </div>
                                    </div>
                                </div>
                                <ReactTooltip id="my-tooltip" place="top" type="dark" effect="float"/>
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
                                                <td colSpan="2">
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