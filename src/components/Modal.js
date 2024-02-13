import React from 'react';
import cross from '../icons/clear-black-18dp.svg'
import { useTranslation } from "react-i18next"
import { Helmet, Shield, Sword, Armor, Ring, Shoes, Pendant } from './icon/icon'


export default function Modal(props) {
    const [t] = useTranslation("global")
    
    return (
        <React.Fragment>
            {props.open &&
            <div className="c-modal-background">
                <div className="c-modal">
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
                                <table className='pj-table'>
                                    <tr>
                                        <td className='char-icon'>
                                            <Sword />
                                        </td>
                                        <td>*Whatever*</td>
                                    </tr>
                                    <tr>
                                        <td className='char-icon'>
                                            <Shield />
                                        </td>
                                        <td>*Whatever*</td>
                                    </tr>
                                    <tr>
                                        <td className='char-icon'>
                                            <Helmet />
                                        </td>
                                        <td>*Whatever*</td>
                                    </tr>
                                    <tr>
                                        <td className='char-icon'>
                                            <Armor />
                                        </td>
                                        <td>*Whatever*</td>
                                    </tr>
                                    <tr>
                                        <td className='char-icon'>
                                            <Shoes />
                                        </td>
                                        <td>*Whatever*</td>
                                    </tr>
                                    <tr>
                                        <td className='char-icon'>
                                            <Ring />
                                        </td>
                                        <td>*Whatever*</td>
                                    </tr>
                                    <tr>
                                        <td className='char-icon'>
                                            <Pendant />
                                        </td>
                                        <td>*Whatever*</td>
                                    </tr>
                                </table>
                                <div className='obj-list'>
                                    <table className='pj-table'>
                                        <tr>
                                            <td>Object</td>
                                        </tr>
                                        <tr>
                                            <td>Object</td>
                                        </tr>
                                        <tr>
                                            <td>Object</td>
                                        </tr>
                                        <tr>
                                            <td>Object</td>
                                        </tr>
                                        <tr>
                                            <td>Object</td>
                                        </tr>
                                        <tr>
                                            <td>Object</td>
                                        </tr>
                                        <tr>
                                            <td>Object</td>
                                        </tr>
                                        <tr>
                                            <td>Object</td>
                                        </tr>
                                        <tr>
                                            <td>Object</td>
                                        </tr>
                                        <tr>
                                            <td>Object</td>
                                        </tr>
                                        <tr>
                                            <td>Object</td>
                                        </tr>
                                        <tr>
                                            <td>Object</td>
                                        </tr>
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