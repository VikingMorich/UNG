import React, { useState } from 'react';
import { useTranslation } from "react-i18next"
import cross from '../icons/clear-black-18dp.svg'
import { BasicAttack, BasicBrain, BasicDex, BasicLuck, BasicShield, BasicStrength, Burned, Stuned, Poisoned } from './icon/icon'


export default function WikiModal(props) {
    const [t] = useTranslation("global")
    const [wikiType, setWikiType] = useState('general')
    return (
        <React.Fragment>
            {props.open && 
                <div className="c-wiki-modal-background">
                    <div className={`c-wiki-modal--content`}>
                        <img className="c-modal--cross" alt="menu-icon" src={cross} onClick={props.toggleModal}/>
                            <h2>{t('wiki.title').toUpperCase()}</h2>
                            <div className='menu-content'>
                                <div className="slides">
                                    <div className={`op-slide ${wikiType === 'general' ? 'selected' : ''}`} onClick={() => {setWikiType('general')}}>
                                        <span>{t('wiki.gen-stats')}</span>
                                    </div>
                                    <div className={`op-slide ${wikiType === 'characters' ? 'selected' : ''}`} onClick={() => {setWikiType('characters')}}>
                                        <span>{t('wiki.types-char')}</span>
                                    </div>
                                    <div className={`op-slide ${wikiType === 'weapons' ? 'selected' : ''}`} onClick={() => {setWikiType('weapons')}}>
                                        <span>{t('wiki.weapons')}</span>
                                    </div>
                                    <div className={`op-slide ${wikiType === 'combat' ? 'selected' : ''}`} onClick={() => {setWikiType('combat')}}>
                                        <span>{t('wiki.combat')}</span>
                                    </div>
                                    <div className={`op-slide ${wikiType === 'combat-stats' ? 'selected' : ''}`} onClick={() => {setWikiType('combat-stats')}}>
                                        <span>{t('wiki.combat-stats')}</span>
                                    </div>
                                    <div className={`op-slide ${wikiType === 'skills' ? 'selected' : ''}`} onClick={() => {setWikiType('skills')}}>
                                        <span>{t('wiki.skills')}</span>
                                    </div>
                                    <div className={`op-slide ${wikiType === 'companion' ? 'selected' : ''}`} onClick={() => {setWikiType('companion')}}>
                                        <span>{t('wiki.companions')}</span>
                                    </div>
                                </div>
                                <div className='op-content'>
                                    {wikiType === 'general' && 
                                        <React.Fragment>
                                            <h2>{t('wiki.gen-stats')}</h2>
                                            <span className='extra-margin'>{t('wiki.gen-stats-info')}</span>
                                            <div className='flex-stat'>
                                                <div className='stat-wrap'>
                                                    <div className='stat-head'>
                                                        <div className='icon-stat'>
                                                            <BasicStrength />
                                                        </div>
                                                        <span>{t('user-hud.strength').toUpperCase()}</span>
                                                    </div>
                                                    <span>{t('wiki.strength-def')}</span>
                                                </div>
                                                <div className='stat-wrap'>
                                                    <div className='stat-head'>
                                                        <div className='icon-stat'>
                                                            <BasicBrain />
                                                        </div>
                                                        <span>{t('user-hud.inteligence').toUpperCase()}</span>
                                                    </div>
                                                    <span>{t('wiki.inteligence-def')}</span>
                                                </div>
                                            </div>
                                            <div className='flex-stat'>
                                                <div className='stat-wrap'>
                                                    <div className='stat-head'>
                                                        <div className='icon-stat'>
                                                            <BasicDex />
                                                        </div>
                                                        <span>{t('user-hud.dexterity').toUpperCase()}</span>
                                                    </div>
                                                    <span>{t('wiki.dex-def')}</span>
                                                </div>
                                                <div className='stat-wrap'>
                                                    <div className='stat-head'>
                                                        <div className='icon-stat'>
                                                            <BasicLuck />
                                                        </div>
                                                        <span>{t('user-hud.luck').toUpperCase()}</span>
                                                    </div>
                                                    <span>{t('wiki.luck-def')}</span>
                                                </div>
                                            </div>
                                            <span className='extra-margin'>{t('wiki.gen-stats-info2')}</span>
                                            <div className='flex-stat'>
                                                <div className='stat-wrap'>
                                                    <div className='stat-head'>
                                                        <div className='icon-stat'>
                                                            <BasicAttack />
                                                        </div>
                                                        <span>{t('user-hud.attack').toUpperCase()}</span>
                                                    </div>
                                                    <span>{t('wiki.attack-def')}</span>
                                                </div>
                                                <div className='stat-wrap'>
                                                    <div className='stat-head'>
                                                        <div className='icon-stat'>
                                                            <BasicShield />
                                                        </div>
                                                        <span>{t('user-hud.defense').toUpperCase()}</span>
                                                    </div>
                                                    <span>{t('wiki.defense-def')}</span>
                                                </div>
                                            </div>
                                            <div className='note-wrap'>
                                                <span>{t('wiki.gen-stats-note')}</span>
                                            </div>
                                        </React.Fragment>
                                    }
                                    {wikiType === 'characters' && 
                                        <React.Fragment>
                                            <h2>{t('wiki.types-char')}</h2>
                                            <div className='char-options-wrap'>
                                                <div className='char-wrap'>
                                                    <span>{t('charsel.mage')}</span>
                                                    <img className='img-char' src="/mage1.jpeg" alt="character1" />
                                                    <div className='stats-wrap'>
                                                        <div className='stat-wrap'>
                                                            <div className='icon-stat big'>
                                                                <BasicBrain />
                                                            </div>
                                                            <span className='big'>75</span>
                                                        </div>
                                                        <div className='stat-wrap'>
                                                            <div className='icon-stat'>
                                                                <BasicStrength />
                                                            </div>
                                                            <div className='icon-stat'>
                                                                <BasicDex />
                                                            </div>
                                                            <div className='icon-stat'>
                                                                <BasicLuck />
                                                            </div>
                                                            <span>50</span>
                                                        </div>
                                                    </div>
                                                    <span>{t('wiki.mage-def')}</span>
                                                </div>
                                                <div className='char-wrap'>
                                                    <span>{t('charsel.warrior')}</span>
                                                    <img className='img-char' src="/warrior1.jpeg" alt="character2" />
                                                    <div className='stats-wrap'>
                                                        <div className='stat-wrap'>
                                                            <div className='icon-stat big'>
                                                                <BasicStrength />
                                                            </div>
                                                            <span className='big'>75</span>
                                                        </div>
                                                        <div className='stat-wrap'>
                                                            <div className='icon-stat'>
                                                                <BasicBrain />
                                                            </div>
                                                            <div className='icon-stat'>
                                                                <BasicDex />
                                                            </div>
                                                            <div className='icon-stat'>
                                                                <BasicLuck />
                                                            </div>
                                                            <span>50</span>
                                                        </div>
                                                    </div>
                                                    <span>{t('wiki.warrior-def')}</span>
                                                </div>
                                                <div className='char-wrap'>
                                                    <span>{t('charsel.archer')}</span>
                                                    <img className='img-char' src="/archer1.jpeg" alt="character3" />
                                                    <div className='stats-wrap'>
                                                        <div className='stat-wrap'>
                                                            <div className='icon-stat big'>
                                                                <BasicDex />
                                                            </div>
                                                            <span className='big'>75</span>
                                                        </div>
                                                        <div className='stat-wrap'>
                                                            <div className='icon-stat'>
                                                                <BasicStrength />
                                                            </div>
                                                            <div className='icon-stat'>
                                                                <BasicBrain />
                                                            </div>
                                                            <div className='icon-stat'>
                                                                <BasicLuck />
                                                            </div>
                                                            <span>50</span>
                                                        </div>
                                                    </div>
                                                    <span>{t('wiki.archer-def')}</span>
                                                </div>
                                            </div>
                                            <div className='note-wrap'>
                                                <span>{t('wiki.types-char-note')}</span>
                                            </div>
                                        </React.Fragment>
                                    }
                                    {wikiType === 'weapons' && 
                                        <React.Fragment>
                                            <h2>{t('wiki.weapons')}</h2>
                                            <span className='extra-margin'>{t('wiki.weapons-info')}</span>
                                            <div className='weapons-flex'>
                                                <div className='img-container'>
                                                    <img alt="weapons-info" src="./wiki/weapons.png" />
                                                </div>
                                                <div className='weapons-op'>
                                                    <span>{t('wiki.weapons-1')}</span>
                                                    <span>{t('wiki.weapons-2')}</span>
                                                    <span>{t('wiki.weapons-3')}</span>
                                                    <span>{t('wiki.weapons-4')}</span>
                                                    <span>{t('wiki.weapons-5')}</span>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    }
                                    {wikiType === 'combat' && 
                                        <React.Fragment>
                                            <h2>{t('wiki.combat')}</h2>
                                            <span className='extra-margin'>{t('wiki.combat-info')}</span>
                                            <span>{t('wiki.combat-info2')}</span>
                                            <span>{t('wiki.combat-info3')}</span>
                                            <div className='note-wrap'>
                                                <span>{t('wiki.combat-warning')}</span>
                                            </div>
                                            <span className='extra-margin'>{t('wiki.combat-info4')}</span>
                                            <div className='note-wrap'>
                                                <span>{t('wiki.combat-note')}</span>
                                            </div>
                                        </React.Fragment>
                                    }
                                    {wikiType === 'combat-stats' && 
                                        <React.Fragment>
                                            <h2>{t('wiki.combat-stats')}</h2>
                                            <span className='extra-margin'>{t('wiki.combat-stats-info')}</span>
                                            <table className='combat-stats-wrap'>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className='img-comb-stat'>
                                                                <Burned />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {t('wiki.burned')}
                                                        </td>
                                                        <td>
                                                            {t('wiki.burned-desc')}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className='img-comb-stat'>
                                                                <Stuned />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {t('wiki.stuned')}
                                                        </td>
                                                        <td>
                                                            {t('wiki.stuned-desc')}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className='img-comb-stat'>
                                                                <Poisoned />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {t('wiki.poisoned')}
                                                        </td>
                                                        <td>
                                                            {t('wiki.poisoned-desc')}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className='note-wrap'>
                                                <span>{t('wiki.combat-stats-note')}</span>
                                            </div>
                                        </React.Fragment>
                                    }
                                    {wikiType === 'skills' && 
                                        <React.Fragment>
                                            <h2>{t('wiki.skills')}</h2>
                                            <span className='extra-margin'>{t('wiki.skills-info')}</span>
                                            <span>{t('wiki.skills-info2')}</span>
                                            <div className='note-wrap'>
                                                <span>{t('wiki.skills-note')}</span>
                                            </div>
                                            <span className='extra-margin'>{t('wiki.skills-info3')}</span>
                                        </React.Fragment>
                                    }
                                    {wikiType === 'companion' && 
                                        <React.Fragment>
                                            <h2>{t('wiki.companions')}</h2>
                                            <span className='extra-margin'>{t('wiki.companions-info')}</span>
                                            <span>{t('wiki.companions-info2')}</span>
                                            <div className='note-wrap'>
                                                <span>{t('wiki.companions-note')}</span>
                                            </div>
                                        </React.Fragment>
                                    }
                                </div>
                            </div>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}