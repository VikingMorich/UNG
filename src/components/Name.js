import React from 'react';
import { useTranslation } from "react-i18next"

export default function Home() {
    const [t, i18n] = useTranslation("global")
    const continueClick = () => {
        window.location = '/character-selection'
    }
    
    return (
        <React.Fragment>
            <h1>*NAME*</h1>
            <div className='button' onClick={continueClick}>
                <span>* CONTINUE *</span>
            </div>
        </React.Fragment>
    );
}