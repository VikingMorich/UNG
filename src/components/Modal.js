import React, {useState, useEffect, useRef} from 'react';
import cross from '../icons/clear-black-18dp.svg'
import { useTranslation } from "react-i18next"
import { Helmet, Shield, Sword, Armor, Ring, Shoes, Pendant } from './icon/icon'


export default function Modal(props) {
    const [t] = useTranslation("global")
    const [openDetails, setOpenDetails] = useState(false)
    const ref = useRef(null)
    const refModal = useRef(null)
    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                closeDetailsFunc()
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
        }
    }
    const closeDetailsFunc = () => {
        setOpenDetails(false)
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
                                <h3>{t('privacy.h1')}</h3>
                                <p>{t('privacy.p2')}</p>
                                <h3>{t('privacy.h2')}</h3>
                                <p>{t('privacy.p3')}</p>
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
                                            <td onClick={openDetailsFunc}>{props.state.gameStates.equip.firstHand}</td>
                                        </tr>
                                        <tr>
                                            <td className='char-icon'>
                                                <Shield />
                                            </td>
                                            <td onClick={openDetailsFunc}>{props.state.gameStates.equip.secondHand}</td>
                                        </tr>
                                        <tr>
                                            <td className='char-icon'>
                                                <Helmet />
                                            </td>
                                            <td onClick={openDetailsFunc}>{props.state.gameStates.equip.helmet}</td>
                                        </tr>
                                        <tr>
                                            <td className='char-icon'>
                                                <Armor />
                                            </td>
                                            <td onClick={openDetailsFunc}>{props.state.gameStates.equip.armor}</td>
                                        </tr>
                                        <tr>
                                            <td className='char-icon'>
                                                <Shoes />
                                            </td>
                                            <td onClick={openDetailsFunc}>{props.state.gameStates.equip.boots}</td>
                                        </tr>
                                        <tr>
                                            <td className='char-icon'>
                                                <Ring />
                                            </td>
                                            <td onClick={openDetailsFunc}>{props.state.gameStates.equip.ring}</td>
                                        </tr>
                                        <tr>
                                            <td className='char-icon'>
                                                <Pendant />
                                            </td>
                                            <td onClick={openDetailsFunc}>{props.state.gameStates.equip.necklace}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='obj-list'>
                                    <span>* Backpack *</span>
                                    <table className='pj-table'>
                                        <tbody>
                                            {Object.keys(props.state.gameStates.backpack).map((element) => {
                                                return <tr key={element} onClick={openDetailsFunc}><td>{props.state.gameStates.backpack[element].name}</td></tr>;
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div ref={ref} className={`option-details ${openDetails ? '' : 'disabled'}`}>
                                    <div className='option-wrapper'>
                                        <span>* Delete *</span>
                                    </div>
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