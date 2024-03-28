import React, {useState} from 'react';
import { useTranslation } from "react-i18next"
import { setUserCharacterType } from '../api/gameFunctions'
import { Tooltip as ReactTooltip } from 'react-tooltip'

export default function CharacterSelection() {
    const [t] = useTranslation("global")
    const [characterType, setCharacterType] = useState('')

    const continueClick = () => {
        if (characterType === '') {
            alert(t('charsel.alert'))
        } else {
            setUserCharacterType(characterType)
        }
    }
    
    return (
        <React.Fragment>
            <div className="character-selector">
                <h1>{t("charsel.title")}</h1>
                <div className='selector-wrapper'>
                    <div className={`character-wrap ${characterType === 'mage' && 'selected'}`} onClick={() => setCharacterType('mage')} data-tooltip-id="tooltip-char" data-tooltip-html={t('charsel.html-tooltip-mage')}>
                        <img src="/mage1.jpeg" alt="character1" />
                        <span>{t('charsel.mage')}</span>
                    </div>
                    <div className={`character-wrap ${characterType === 'warrior' && 'selected'}`} onClick={() => setCharacterType('warrior')} data-tooltip-id="tooltip-char" data-tooltip-html={t('charsel.html-tooltip-war')}>
                        <img src="/warrior1.jpeg" alt="character2" />
                        <span>{t('charsel.warrior')}</span>
                    </div>
                    <div className={`character-wrap ${characterType === 'archer' && 'selected'}`} onClick={() => setCharacterType('archer')} data-tooltip-id="tooltip-char" data-tooltip-html={t('charsel.html-tooltip-arc')}>
                        <img src="/archer1.jpeg" alt="character3" />
                        <span>{t('charsel.archer')}</span>
                    </div>
                </div>
                <ReactTooltip id="tooltip-char" place="bottom" type="dark" effect="float" className='font-tooltip-centered'/>
                <div className='button' onClick={continueClick}>
                    <span>{t('charsel.continue')}</span>
                </div>
            </div>
        </React.Fragment>
    );
}