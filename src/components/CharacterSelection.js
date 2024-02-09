import React from 'react';
import { useTranslation } from "react-i18next"

export default function Home() {
    const [t, i18n] = useTranslation("global")
    
    return (
        <div className="character-selector">
            <h1>*CharacterSelection*</h1>
            <div className='selector-wrapper'>
                <div className='character-wrap'>
                    <img src="/orco.jpeg" alt="character1" />
                    <span>* MAGE *</span>
                </div>
                <div className='character-wrap'>
                    <img src="/orco.jpeg" alt="character1" />
                    <span>* WARRIOR *</span>
                </div>
                <div className='character-wrap'>
                    <img src="/orco.jpeg" alt="character1" />
                    <span>* ARCHER *</span>
                </div>
            </div>
        </div>
    );
}