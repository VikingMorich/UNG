import React, {useState} from 'react';
import { useTranslation } from "react-i18next"
import { setUserCharacterType } from '../api/gameFunctions'
import { Tooltip as ReactTooltip } from 'react-tooltip'

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
                <h1>Selección de personaje</h1>
                <div className='selector-wrapper'>
                    <div className={`character-wrap ${characterType === 'mage' && 'selected'}`} onClick={() => setCharacterType('mage')} data-tooltip-id="tooltip-char" data-tooltip-html={'El mago domina la inteligencia como principal estadística. </br></br>Puede aprender diferentes tipos de magia que le serán</br> muy útiles en los combates.'}>
                        <img src="/mage1.jpeg" alt="character1" />
                        <span>MAGO</span>
                    </div>
                    <div className={`character-wrap ${characterType === 'warrior' && 'selected'}`} onClick={() => setCharacterType('warrior')} data-tooltip-id="tooltip-char" data-tooltip-html={'El guerrero domina la fuerza como principal estadística. </br></br>Sus golpes en combate lo convierten en </br>un épico y feroz luchador'}>
                        <img src="/warrior1.jpeg" alt="character2" />
                        <span>GUERRERO</span>
                    </div>
                    <div className={`character-wrap ${characterType === 'archer' && 'selected'}`} onClick={() => setCharacterType('archer')} data-tooltip-id="tooltip-char" data-tooltip-html={'El arquero domina la destreza como principal estadística. </br></br>Con sus agiles movimientos sabe sacar probecho </br>a todas las situaciones de combate.'}>
                        <img src="/archer1.jpeg" alt="character3" />
                        <span>ARQUERO</span>
                    </div>
                </div>
                <ReactTooltip id="tooltip-char" place="bottom" type="dark" effect="float" className='font-tooltip-centered'/>
                <div className='button' onClick={continueClick}>
                    <span>CONTINUAR</span>
                </div>
            </div>
        </React.Fragment>
    );
}