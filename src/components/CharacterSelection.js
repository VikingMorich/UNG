import React, {useState} from 'react';
import { useTranslation } from "react-i18next"
import { setUserCharacterType } from '../api/gameFunctions'

export default function CharacterSelection() {
    const [t, i18n] = useTranslation("global")
    const [characterType, setCharacterType] = useState('')

    const continueClick = () => {
        if (characterType === '') {
            alert('* Has de selecionar un tipus per continuar *')
        } else {
            setUserCharacterType(characterType)
        }
    }
    
    return (
        <React.Fragment>
            <div className="character-selector">
                <h1>*CharacterSelection*</h1>
                <div className='selector-wrapper'>
                    <div className={`character-wrap ${characterType === 'mage' && 'selected'}`} onClick={() => setCharacterType('mage')}>
                        <img src="/mage1.jpeg" alt="character1" />
                        <span>* MAGE *</span>
                    </div>
                    <div className={`character-wrap ${characterType === 'warrior' && 'selected'}`} onClick={() => setCharacterType('warrior')}>
                        <img src="/warrior1.jpeg" alt="character2" />
                        <span>* WARRIOR *</span>
                    </div>
                    <div className={`character-wrap ${characterType === 'archer' && 'selected'}`} onClick={() => setCharacterType('archer')}>
                        <img src="/archer1.jpeg" alt="character3" />
                        <span>* ARCHER *</span>
                    </div>
                </div>
                <div className='button' onClick={continueClick}>
                    <span>* CONTINUE *</span>
                </div>
            </div>
        </React.Fragment>
    );
}