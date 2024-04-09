import React, {useState, useEffect, useRef} from 'react';
import cross from '../icons/clear-black-18dp.svg'
import { useTranslation } from "react-i18next"
import { Helmet, Shield, Sword, Armor, Ring, Shoes, Pendant } from './icon/icon'
import { ObjHelmet, ObjNone, ObjBoots, ObjSword, ObjShield, ObjRing, ObjNecklace, ObjArmor, ObjCrossbow, ObjSpellBook, ObjKnife, ObjPotion, ObjAxe, ObjLance, ObjStaff } from './icon/objectIcon'
import { deleteObj, equipObj, unequipObj, getSellPrice, sellObj, saveSkillPoints, funcUseBackpackPotion } from '../api/gameFunctions'
import { skillsWarrior, skillsMage, skillsArcher } from '../api/gameDatabase'
import ObjInspector from './ObjInspector'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { setInventoryStateOpen } from '../fireSubscription'
import { SellIcon, InspectIcon, EquipIcon, UnequipIcon, DeleteIcon, DrinkIcon, BasicAttack, BasicBrain, BasicDex, BasicLuck, BasicMoney, BasicShield, BasicStrength } from './icon/icon'
import ProgressBar from './ProgressBar'
import { historyPages } from '../api/gameHistory'


export default function Modal(props) {
    const [t] = useTranslation("global")
    const [openObjInspector, setOpenObjInspector] = useState(false)
    const [objClicked, setObjClicked] = useState(null)
    const [skillSelected, setSkillSelected] = useState([])
    const [currSkillPoints, setCurrSkillPoints] = useState(props.state?.gameStates?.skillPoints || 0)
    const ref = useRef(null)
    const refModal = useRef(null)
    const computedCompanion = 
    props.state ? 
      props.stateprops.state.gameStates.companion === 'boar' ? 'boar.png' : 
      props.state.gameStates.companion === 'eagle' ? 'eagle.png' : 
      props.state.gameStates.companion === 'snake' ? 'snake.png' : 
      props.state.gameStates.companion === 'wolf' ? 'wolf.png' : 
      props.state.gameStates.companion === 'otter' ? 'otter.png' : 
      props.state.gameStates.companion === 'fox' ? 'fox.png' : 
      props.state.gameStates.companion === 'deer' ? 'deer.png' : 'unknown.png'
      : 'unknown.png'

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

    let equipedSwordId = equipedItems.find(el => el.state.type === 'firstHand') ? equipedItems.find(el => el.state.type === 'firstHand').key : equipedItems.find(el => el.state.type === 'twoHand') ? equipedItems.find(el => el.state.type === 'twoHand').key : ''
    let equipedShieldId = equipedItems.find(el => el.state.type === 'secondHand') ? equipedItems.find(el => el.state.type === 'secondHand').key : ''
    let equipedHelmetId = equipedItems.find(el => el.state.type === 'helmet') ? equipedItems.find(el => el.state.type === 'helmet').key : ''
    let equipedArmorId = equipedItems.find(el => el.state.type === 'armor') ? equipedItems.find(el => el.state.type === 'armor').key : ''
    let equipedBootsId = equipedItems.find(el => el.state.type === 'boots') ? equipedItems.find(el => el.state.type === 'boots').key : ''
    let equipedRingId = equipedItems.find(el => el.state.type === 'ring') ? equipedItems.find(el => el.state.type === 'ring').key : ''
    let equipedNecklaceId = equipedItems.find(el => el.state.type === 'necklace') ? equipedItems.find(el => el.state.type === 'necklace').key : ''


    let currentSkills = []
    if (props.state && props.state.gameStates && props.state.gameStates.characterType)
        currentSkills = props.state.gameStates.characterType === 'warrior' ? skillsWarrior : props.state.gameStates.characterType === 'mage' ? skillsMage : skillsArcher

    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            setObjClicked(null)
            closeObjInspector()
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

    //setObjClicked(id)

    const deleteObjFunc = (obj) => {
        deleteObj(obj)
    }

    const sellObjFunc = (obj) => {
        sellObj(obj, getSellPrice(props.state.gameStates.backpack[obj].name))
    }

    const funcUsePotion = (obj) => {
        funcUseBackpackPotion(obj)
    }

    const inspectObjFunc = (obj) => {
        setObjClicked(obj)
        setOpenObjInspector(true)
    }

    const closeObjInspector = () => {
        setOpenObjInspector(false)
    }

    const equipObjFunc = (obj) => {
        equipObj(obj)
    }

    const unequipObjFunc = (obj) => {
        unequipObj(obj)
    }

    const saveSkillChanges = () => {
        //if (props.state.gameStates.history !== 'battle') {
            setInventoryStateOpen(false)
            saveSkillPoints(skillSelected, props.state.gameStates.skillPoints - currSkillPoints)
        // } else {
        //     alert("* You cannot update skills in the middle of a combat *")
        // }
        
    }
    const updateSelectSkill = (event) => {
        if (props.state.gameStates) {
        let x = event.currentTarget.id
        //currentSkills

        let listSkills = []
        Object.keys(currentSkills).map(el => {
            currentSkills[el].map(ele => {
                ele.children.map(elem => {
                    if (elem.children) {
                        elem.children.map(eleme => {
                            return listSkills.push({...eleme, father: elem.name})
                        })
                    }
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
    // useEffect(() => {
    //     if (objClicked && props.state && props.state.gameStates.backpack[objClicked]) {
    //         setSellPrice(getSellPrice(props.state.gameStates.backpack[objClicked].name))
    //     }
    // }, [objClicked, props.state]);

    return (
        <React.Fragment>
            {props.open &&
            <div className="c-modal-background">
                <div ref={refModal} className={props.type === 'inventory' ? 'big-modal' : "c-modal"}>
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
                                <h1>{t('user-hud.inventory-title')}</h1>
                                <div className='inv-wrap'>
                                    <div className='img-wrap'>
                                        <span>{props.state.username}</span>
                                        <div className='img-container'>
                                            <img className='char-img' alt="character" src={props.state.gameStates.characterType === 'mage' ? '/mage1.jpeg' : props.state.gameStates.characterType === 'warrior' ? '/warrior1.jpeg' : '/archer1.jpeg'} />
                                            <div className='companion-img-wrap'>
                                                <img className="user-img" alt="user-companion" src={`./companions/${computedCompanion}`}/>
                                            </div>
                                        </div>
                                        <div className="user-stat">
                                            <span className='text-stat'>HP</span>
                                            <ProgressBar value={props.state.gameStates.HP} maxValue={props.state.gameStates.maxHP} lastAttack={props.state.gameStates.battle?.lastEnemyDmg || 0} color='red' size='s'/>
                                        </div>
                                        <div className="user-stat">
                                            <span className='text-stat'>EXP</span>
                                            <ProgressBar value={props.state.gameStates.EXP} maxValue={props.state.gameStates.maxEXP} color='blue' size='s'/>
                                        </div>
                                    </div>
                                    <div className='stat-wrap'>
                                        <div className="user-statistics">
                                            <div className="char-stat">
                                            <div className='basic-state-icon'>
                                                <BasicStrength/>
                                            </div>
                                                <span>{props.state.gameStates.FUE}</span>
                                            </div>
                                            <div className="char-stat">
                                                <div className='basic-state-icon'>
                                                    <BasicBrain/>
                                                </div>
                                                <span>{props.state.gameStates.INT}</span>
                                            </div>
                                            <div className="char-stat">
                                                <div className='basic-state-icon'>
                                                    <BasicDex/>
                                                </div>
                                                <span>{props.state.gameStates.PUN}</span>
                                            </div>
                                            <div className="char-stat">
                                                <div className='basic-state-icon'>
                                                    <BasicLuck/>
                                                </div>
                                                <span>{props.state.gameStates.SUE}</span>
                                            </div>
                                            <div className="char-stat">
                                                <div className='basic-state-icon'>
                                                    <BasicAttack/>
                                                </div>
                                                <span>{props.state.gameStates.ATK}</span>
                                            </div>
                                            <div className="char-stat">
                                                <div className='basic-state-icon'>
                                                    <BasicShield/>
                                                </div>
                                                <span>{props.state.gameStates.DEF}</span>
                                            </div>
                                            <div className="char-stat">
                                                <div className='basic-state-icon'>
                                                    <BasicMoney/>
                                                </div>
                                                <span>{props.state.gameStates.gold}</span>
                                            </div>
                                        </div>
                                        <table className='pj-table'>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className='char-icon-container'>
                                                            <Sword />
                                                        </div>
                                                    </td>
                                                    <td id={equipedSwordId} className="maximize">{equipedItems.find(el => el.state.type === 'firstHand') ? t('items.'+equipedItems.find(el => el.state.type === 'firstHand').state.name) : equipedItems.find(el => el.state.type === 'twoHand') ? t('items.'+equipedItems.find(el => el.state.type === 'twoHand').state.name) : '-'}</td>
                                                    <td>
                                                        {equipedSwordId !== '' &&
                                                        
                                                            <div className='buttons-wrap'>
                                                                <div className={`button-icon`} onClick={() => deleteObjFunc(equipedSwordId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-delete')}>
                                                                    <DeleteIcon />
                                                                </div>
                                                                <div className='button-icon' onClick={() => inspectObjFunc(equipedSwordId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-inspect')}>
                                                                    <InspectIcon />
                                                                </div>
                                                                {props.state.gameStates.backpack[equipedSwordId].type !== 'potion' && 
                                                                <React.Fragment>
                                                                    {!props.state.gameStates.backpack[equipedSwordId].equiped ? 
                                                                    <div className={`button-icon`} onClick={() => equipObjFunc(equipedSwordId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-equip')}>
                                                                        <EquipIcon />
                                                                    </div> :
                                                                    <div className={`button-icon`} onClick={() => unequipObjFunc(equipedSwordId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-unequip')}>
                                                                        <UnequipIcon />
                                                                    </div>
                                                                    }
                                                                </React.Fragment>
                                                                }
                                                                {historyPages[props.state.gameStates.history].type === 'shop' && 
                                                                    <div className={`button-icon`} onClick={() => sellObjFunc(equipedSwordId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-sell') + ' (' + props.state.gameStates.backpack[equipedSwordId].sellPrice + ')'}>
                                                                        <SellIcon />
                                                                    </div>
                                                                }
                                                            </div>
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='char-icon-container'>
                                                            <Shield />
                                                        </div>
                                                    </td>
                                                    <td id={equipedShieldId}>{equipedItems.find(el => el.state.type === 'secondHand') ? t('items.'+equipedItems.find(el => el.state.type === 'secondHand').state.name) : '-'}</td>
                                                    <td>
                                                        {equipedShieldId !== '' &&
                                                        
                                                            <div className='buttons-wrap'>
                                                                <div className={`button-icon`} onClick={() => deleteObjFunc(equipedShieldId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-delete')}>
                                                                    <DeleteIcon />
                                                                </div>
                                                                <div className='button-icon' onClick={() => inspectObjFunc(equipedShieldId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-inspect')}>
                                                                    <InspectIcon />
                                                                </div>
                                                                {props.state.gameStates.backpack[equipedShieldId].type !== 'potion' && 
                                                                <React.Fragment>
                                                                    {!props.state.gameStates.backpack[equipedShieldId].equiped ? 
                                                                    <div className={`button-icon`} onClick={() => equipObjFunc(equipedShieldId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-equip')}>
                                                                        <EquipIcon />
                                                                    </div> :
                                                                    <div className={`button-icon`} onClick={() => unequipObjFunc(equipedShieldId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-unequip')}>
                                                                        <UnequipIcon />
                                                                    </div>
                                                                    }
                                                                </React.Fragment>
                                                                }
                                                                {historyPages[props.state.gameStates.history].type === 'shop' && 
                                                                    <div className={`button-icon`} onClick={() => sellObjFunc(equipedShieldId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-sell') + ' (' + props.state.gameStates.backpack[equipedShieldId].sellPrice + ')'}>
                                                                        <SellIcon />
                                                                    </div>
                                                                }
                                                            </div>
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='char-icon-container'>
                                                            <Helmet />
                                                        </div>
                                                    </td>
                                                    <td id={equipedHelmetId}>{equipedItems.find(el => el.state.type === 'helmet') ? t('items.'+equipedItems.find(el => el.state.type === 'helmet').state.name) : '-'}</td>
                                                    <td>
                                                        {equipedHelmetId !== '' &&
                                                        
                                                            <div className='buttons-wrap'>
                                                                <div className={`button-icon`} onClick={() => deleteObjFunc(equipedHelmetId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-delete')}>
                                                                    <DeleteIcon />
                                                                </div>
                                                                <div className='button-icon' onClick={() => inspectObjFunc(equipedHelmetId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-inspect')}>
                                                                    <InspectIcon />
                                                                </div>
                                                                {props.state.gameStates.backpack[equipedHelmetId].type !== 'potion' && 
                                                                <React.Fragment>
                                                                    {!props.state.gameStates.backpack[equipedHelmetId].equiped ? 
                                                                    <div className={`button-icon`} onClick={() => equipObjFunc(equipedHelmetId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-equip')}>
                                                                        <EquipIcon />
                                                                    </div> :
                                                                    <div className={`button-icon`} onClick={() => unequipObjFunc(equipedHelmetId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-unequip')}>
                                                                        <UnequipIcon />
                                                                    </div>
                                                                    }
                                                                </React.Fragment>
                                                                }
                                                                {historyPages[props.state.gameStates.history].type === 'shop' && 
                                                                    <div className={`button-icon`} onClick={() => sellObjFunc(equipedHelmetId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-sell') + ' (' + props.state.gameStates.backpack[equipedHelmetId].sellPrice + ')'}>
                                                                        <SellIcon />
                                                                    </div>
                                                                }
                                                            </div>
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='char-icon-container'>
                                                            <Armor />
                                                        </div>
                                                    </td>
                                                    <td id={equipedArmorId}>{equipedItems.find(el => el.state.type === 'armor') ? t('items.'+equipedItems.find(el => el.state.type === 'armor').state.name) : '-'}</td>
                                                    <td>
                                                        {equipedArmorId !== '' &&
                                                        
                                                            <div className='buttons-wrap'>
                                                                <div className={`button-icon`} onClick={() => deleteObjFunc(equipedArmorId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-delete')}>
                                                                    <DeleteIcon />
                                                                </div>
                                                                <div className='button-icon' onClick={() => inspectObjFunc(equipedArmorId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-inspect')}>
                                                                    <InspectIcon />
                                                                </div>
                                                                {props.state.gameStates.backpack[equipedArmorId].type !== 'potion' && 
                                                                <React.Fragment>
                                                                    {!props.state.gameStates.backpack[equipedArmorId].equiped ? 
                                                                    <div className={`button-icon`} onClick={() => equipObjFunc(equipedArmorId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-equip')}>
                                                                        <EquipIcon />
                                                                    </div> :
                                                                    <div className={`button-icon`} onClick={() => unequipObjFunc(equipedArmorId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-unequip')}>
                                                                        <UnequipIcon />
                                                                    </div>
                                                                    }
                                                                </React.Fragment>
                                                                }
                                                                {historyPages[props.state.gameStates.history].type === 'shop' && 
                                                                    <div className={`button-icon`} onClick={() => sellObjFunc(equipedArmorId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-sell') + ' (' + props.state.gameStates.backpack[equipedArmorId].sellPrice + ')'}>
                                                                        <SellIcon />
                                                                    </div>
                                                                }
                                                            </div>
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='char-icon-container'>
                                                            <Shoes />
                                                        </div>
                                                    </td>
                                                    <td id={equipedBootsId}>{equipedItems.find(el => el.state.type === 'boots') ? t('items.'+equipedItems.find(el => el.state.type === 'boots').state.name) : '-'}</td>
                                                    <td>
                                                        {equipedBootsId !== '' &&
                                                        
                                                            <div className='buttons-wrap'>
                                                                <div className={`button-icon`} onClick={() => deleteObjFunc(equipedBootsId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-delete')}>
                                                                    <DeleteIcon />
                                                                </div>
                                                                <div className='button-icon' onClick={() => inspectObjFunc(equipedBootsId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-inspect')}>
                                                                    <InspectIcon />
                                                                </div>
                                                                {props.state.gameStates.backpack[equipedBootsId].type !== 'potion' && 
                                                                <React.Fragment>
                                                                    {!props.state.gameStates.backpack[equipedBootsId].equiped ? 
                                                                    <div className={`button-icon`} onClick={() => equipObjFunc(equipedBootsId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-equip')}>
                                                                        <EquipIcon />
                                                                    </div> :
                                                                    <div className={`button-icon`} onClick={() => unequipObjFunc(equipedBootsId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-unequip')}>
                                                                        <UnequipIcon />
                                                                    </div>
                                                                    }
                                                                </React.Fragment>
                                                                }
                                                                {historyPages[props.state.gameStates.history].type === 'shop' && 
                                                                    <div className={`button-icon`} onClick={() => sellObjFunc(equipedBootsId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-sell') + ' (' + props.state.gameStates.backpack[equipedBootsId].sellPrice + ')'}>
                                                                        <SellIcon />
                                                                    </div>
                                                                }
                                                            </div>
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='char-icon-container'>
                                                            <Ring />
                                                        </div>
                                                    </td>
                                                    <td id={equipedRingId}>{equipedItems.find(el => el.state.type === 'ring') ? t('items.'+equipedItems.find(el => el.state.type === 'ring').state.name) : '-'}</td>
                                                    <td>
                                                        {equipedRingId !== '' &&
                                                        
                                                            <div className='buttons-wrap'>
                                                                <div className={`button-icon`} onClick={() => deleteObjFunc(equipedRingId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-delete')}>
                                                                    <DeleteIcon />
                                                                </div>
                                                                <div className='button-icon' onClick={() => inspectObjFunc(equipedRingId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-inspect')}>
                                                                    <InspectIcon />
                                                                </div>
                                                                {props.state.gameStates.backpack[equipedRingId].type !== 'potion' && 
                                                                <React.Fragment>
                                                                    {!props.state.gameStates.backpack[equipedRingId].equiped ? 
                                                                    <div className={`button-icon`} onClick={() => equipObjFunc(equipedRingId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-equip')}>
                                                                        <EquipIcon />
                                                                    </div> :
                                                                    <div className={`button-icon`} onClick={() => unequipObjFunc(equipedRingId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-unequip')}>
                                                                        <UnequipIcon />
                                                                    </div>
                                                                    }
                                                                </React.Fragment>
                                                                }
                                                                {historyPages[props.state.gameStates.history].type === 'shop' && 
                                                                    <div className={`button-icon`} onClick={() => sellObjFunc(equipedRingId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-sell') + ' (' + props.state.gameStates.backpack[equipedRingId].sellPrice + ')'}>
                                                                        <SellIcon />
                                                                    </div>
                                                                }
                                                            </div>
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className='char-icon-container'>
                                                            <Pendant />
                                                        </div>
                                                    </td>
                                                    <td id={equipedNecklaceId}>{equipedItems.find(el => el.state.type === 'necklace') ? t('items.'+equipedItems.find(el => el.state.type === 'necklace').state.name) : '-'}</td>
                                                    <td>
                                                        {equipedNecklaceId !== '' &&
                                                        
                                                            <div className='buttons-wrap'>
                                                                <div className={`button-icon`} onClick={() => deleteObjFunc(equipedNecklaceId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-delete')}>
                                                                    <DeleteIcon />
                                                                </div>
                                                                <div className='button-icon' onClick={() => inspectObjFunc(equipedNecklaceId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-inspect')}>
                                                                    <InspectIcon />
                                                                </div>
                                                                {props.state.gameStates.backpack[equipedNecklaceId].type !== 'potion' && 
                                                                <React.Fragment>
                                                                    {!props.state.gameStates.backpack[equipedNecklaceId].equiped ? 
                                                                    <div className={`button-icon`} onClick={() => equipObjFunc(equipedNecklaceId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-equip')}>
                                                                        <EquipIcon />
                                                                    </div> :
                                                                    <div className={`button-icon`} onClick={() => unequipObjFunc(equipedNecklaceId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-unequip')}>
                                                                        <UnequipIcon />
                                                                    </div>
                                                                    }
                                                                </React.Fragment>
                                                                }
                                                                {historyPages[props.state.gameStates.history].type === 'shop' && 
                                                                    <div className={`button-icon`} onClick={() => sellObjFunc(equipedNecklaceId)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-sell') + ' (' + props.state.gameStates.backpack[equipedNecklaceId].sellPrice + ')'}>
                                                                        <SellIcon />
                                                                    </div>
                                                                }
                                                            </div>
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className='obj-list'>
                                            <span>{t('user-hud.backpack')}</span>
                                            <div className='table-wrapper'>
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
                                                                <td className="maximize" id={element.key}>{t('items.' + props.state.gameStates.backpack[element.key].name)}</td>
                                                                <td>
                                                                    <div className='buttons-wrap'>
                                                                        <div className={`button-icon`} onClick={() => deleteObjFunc(element.key)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-delete')}>
                                                                            <DeleteIcon />
                                                                        </div>
                                                                        <div className='button-icon' onClick={() => inspectObjFunc(element.key)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-inspect')}>
                                                                            <InspectIcon />
                                                                        </div>
                                                                        {props.state.gameStates.backpack[element.key].type !== 'potion' && 
                                                                        <React.Fragment>
                                                                            {!props.state.gameStates.backpack[element.key].equiped ? 
                                                                            <div className={`button-icon`} onClick={() => equipObjFunc(element.key)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-equip')}>
                                                                                <EquipIcon />
                                                                            </div> :
                                                                            <div className={`button-icon`} onClick={() => unequipObjFunc(element.key)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-unequip')}>
                                                                                <UnequipIcon />
                                                                            </div>
                                                                            }
                                                                        </React.Fragment>
                                                                        }
                                                                        {props.state.gameStates.backpack[element.key].type === 'potion' && 
                                                                            <div className={`button-icon`} onClick={() => {funcUsePotion(element.key)}} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-drink')}>
                                                                                <DrinkIcon />
                                                                            </div>
                                                                        }
                                                                        {historyPages[props.state.gameStates.history].type === 'shop' && 
                                                                            <div className={`button-icon`} onClick={() => sellObjFunc(element.key)} data-tooltip-id="tooltip-inventory" data-tooltip-html={t('user-hud.tooltip-sell') + ' (' + element.state.sellPrice + ')'}>
                                                                                <SellIcon />
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </td>
                                                            </tr>;
                                                        })}
                                                    </tbody>
                                                </table>
                                                <ReactTooltip id="tooltip-inventory" place="top" type="dark" effect="float"/>
                                            </div>
                                        </div>
                                        {openObjInspector && objClicked &&
                                            <ObjInspector obj={props.state.gameStates.backpack[objClicked] || null}/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    }
                    {
                        props.type === 'skills' && 
                        <React.Fragment>
                            <div className="c-modal--skills">
                                <h1>{t('user-hud.skills-title')}</h1>
                                <div className='points-wrapper'>
                                    <span>{t('user-hud.skill-points')}</span>
                                    <span>{currSkillPoints}</span>
                                </div>
                                <div className='skills-view'>
                                    <div className='skills-tree'>
                                        <h2>{t('user-hud.pasives')}</h2>
                                        <div className='skills-wrap'>
                                            {currentSkills.pasives.map(el => {
                                                return <div key={el.name} className='skill-tree'>
                                                    <div id={el.name} onClick={updateSelectSkill} className={`skill-ball ` + (skillSelected.indexOf(el.name) !== -1 ? ' selected' : '' ) + 
                                                    ((props.state.gameStates.learnedSkills && props.state.gameStates.learnedSkills.indexOf(el.name) !== -1) ? ' learned' : '') +
                                                    (el.skillPoints > currSkillPoints ? ' disabled' : '')
                                                    } data-tooltip-id="my-tooltip" data-tooltip-html={t('user-hud.'+el.description) + (el.countdown !== 0 ? ('</br>' + t('user-hud.countdown') + el.countdown ) : '') + '</br>' + t('user-hud.skill-points') + el.skillPoints}>
                                                        <span>{t('user-hud.'+el.name)}</span>
                                                    </div>
                                                    {el.children.length === 1 && <div className='vertical-separator'></div>}
                                                    {el.children.length === 2 && <React.Fragment>
                                                        <div className='short-vertical-separator'></div>
                                                        <div className='double-separator'></div>
                                                    </React.Fragment>}
                                                    {el.children.length === 3 && <React.Fragment>
                                                        <div className='short-vertical-separator'/>
                                                        <div className='triple-separator'><div className='short-vertical-separator'/></div>
                                                    </React.Fragment>}
                                                    <div className='second-lvl'>
                                                        {el.children.length > 0 && el.children.map(ele => {
                                                        return <div className='skill-subnode'>
                                                            <div key={ele.name} id={ele.name}  onClick={updateSelectSkill} className={`skill-ball ` + (skillSelected.indexOf(ele.name) !== -1 ? ' selected' : '' ) + 
                                                            ((props.state.gameStates.learnedSkills && props.state.gameStates.learnedSkills.indexOf(ele.name) !== -1) ? ' learned' : '') +
                                                            ((ele.skillPoints <= currSkillPoints && ((skillSelected.indexOf(el.name) !== -1) || (props.state.gameStates.learnedSkills && props.state.gameStates.learnedSkills.indexOf(el.name) !== -1))) ? '' : ' disabled')
                                                            } data-tooltip-id="my-tooltip" data-tooltip-html={t('user-hud.'+ele.description) + (ele.countdown !== 0 ? ('</br>' + t('user-hud.countdown') + ele.countdown ) : '') + '</br>' + t('user-hud.skill-points') + ele.skillPoints}>
                                                                <span>{t('user-hud.'+ele.name)}</span>
                                                            </div>

                                                            {ele.children && 
                                                            <React.Fragment>
                                                                {ele.children.length === 2 && <React.Fragment>
                                                                    <div className='short-vertical-separator'></div>
                                                                    <div className='double-separator'></div>
                                                                </React.Fragment>}
                                                                <div className='third-lvl'>
                                                                    {ele.children.length > 0 && ele.children.map(elem => {
                                                                    return <React.Fragment>
                                                                        <div key={elem.name} id={elem.name}  onClick={updateSelectSkill} className={`skill-ball ` + (skillSelected.indexOf(elem.name) !== -1 ? ' selected' : '' ) + 
                                                                        ((props.state.gameStates.learnedSkills && props.state.gameStates.learnedSkills.indexOf(elem.name) !== -1) ? ' learned' : '') +
                                                                        ((elem.skillPoints <= currSkillPoints && ((skillSelected.indexOf(ele.name) !== -1) || (props.state.gameStates.learnedSkills && props.state.gameStates.learnedSkills.indexOf(ele.name) !== -1))) ? '' : ' disabled')
                                                                        } data-tooltip-id="my-tooltip" data-tooltip-html={t('user-hud.'+elem.description) + (elem.countdown !== 0 ? ('</br>' + t('user-hud.countdown') + elem.countdown ) : '') + '</br>' + t('user-hud.skill-points') + elem.skillPoints}>
                                                                            <span>{t('user-hud.'+elem.name)}</span>
                                                                        </div>
                                                                    </React.Fragment>
                                                                    })}
                                                                </div>
                                                            </React.Fragment>
                                                            }
                                                        </div>
                                                        })}
                                                    </div>
                                                </div>
                                            }) }
                                        </div>
                                    </div>
                                    <div className='skills-tree'>
                                        <h2>{t('user-hud.combat')}</h2>
                                        <div className='skills-wrap'>
                                            {currentSkills.combat.map(el => {
                                                return <div className='skill-tree'>
                                                    <div key={el.name} id={el.name} onClick={updateSelectSkill} className={`skill-ball ` + (skillSelected.indexOf(el.name) !== -1 ? 'selected' : '' ) + 
                                                    ((props.state.gameStates.learnedSkills && props.state.gameStates.learnedSkills.indexOf(el.name) !== -1) ? ' learned' : '') +
                                                    (el.skillPoints > currSkillPoints ? ' disabled' : '')
                                                    } data-tooltip-id="my-tooltip" data-tooltip-html={t('user-hud.new-attack') + t('user-hud.'+el.description) + '</br>' + t('user-hud.skill-points') + el.skillPoints + (el.countdown !== 0 ? ('</br>' + t('user-hud.countdown') + el.countdown ) : '')}>
                                                        <span>{t('user-hud.'+el.name)}</span>
                                                    </div>
                                                    
                                                    {el.children.length > 0 && el.children.map(ele => {
                                                    return <React.Fragment>
                                                        <div className='vertical-separator'></div>
                                                        <div key={ele.name} id={ele.name} onClick={updateSelectSkill} className={`skill-ball ` + (skillSelected.indexOf(ele.name) !== -1 ? 'selected' : '' ) + 
                                                        ((props.state.gameStates.learnedSkills && props.state.gameStates.learnedSkills.indexOf(ele.name) !== -1) ? ' learned' : '') + 
                                                        ((ele.skillPoints <= currSkillPoints && ((skillSelected.indexOf(el.name) !== -1) || (props.state.gameStates.learnedSkills && props.state.gameStates.learnedSkills.indexOf(el.name) !== -1))) ? '' : ' disabled')
                                                        } data-tooltip-id="my-tooltip" data-tooltip-html={t('user-hud.new-attack') + t('user-hud.'+ele.description) + '</br>' + t('user-hud.skill-points') + ele.skillPoints + (ele.countdown !== 0 ? ('</br>' + t('user-hud.countdown') + ele.countdown ) : '')}>
                                                            <span>{t('user-hud.'+ele.name)}</span>
                                                        </div>
                                                        {ele.children && 
                                                            <React.Fragment>
                                                                <div className='vertical-separator'></div>
                                                                <div className='third-lvl'>
                                                                    {ele.children.length > 0 && ele.children.map(elem => {
                                                                    return <React.Fragment>
                                                                        <div key={elem.name} id={elem.name}  onClick={updateSelectSkill} className={`skill-ball ` + (skillSelected.indexOf(elem.name) !== -1 ? ' selected' : '' ) + 
                                                                        ((props.state.gameStates.learnedSkills && props.state.gameStates.learnedSkills.indexOf(elem.name) !== -1) ? ' learned' : '') +
                                                                        ((elem.skillPoints <= currSkillPoints && ((skillSelected.indexOf(ele.name) !== -1) || (props.state.gameStates.learnedSkills && props.state.gameStates.learnedSkills.indexOf(ele.name) !== -1))) ? '' : ' disabled')
                                                                        } data-tooltip-id="my-tooltip" data-tooltip-html={t('user-hud.new-attack') + t('user-hud.'+elem.description) + (elem.countdown !== 0 ? ('</br>' + t('user-hud.countdown') + elem.countdown ) : '') + '</br>' + t('user-hud.skill-points') + elem.skillPoints}>
                                                                            <span>{t('user-hud.'+elem.name)}</span>
                                                                        </div>
                                                                    </React.Fragment>
                                                                    })}
                                                                </div>
                                                            </React.Fragment>
                                                            }
                                                    </React.Fragment>
                                                    })}
                                                    </div>
                                            }) }
                                        </div>
                                    </div>
                                </div>
                                <ReactTooltip id="my-tooltip" place="top" type="dark" effect="float" className='font-tooltip'/>
                                <div className="button" onClick={saveSkillChanges}>
                                    <span>{t('user-hud.save')}</span>
                                </div>
                            </div>
                        </React.Fragment>
                    }
                    {
                        props.type === 'map' && 
                        <React.Fragment>
                            <div className="c-modal--map">
                                <h1>{t('user-hud.map-title')}</h1>
                                <img className='map-view' alt="map" src="./map1.jpg" />
                            </div>
                        </React.Fragment>
                    }
                </div>
            </div>
            }
        </React.Fragment>
    );
}