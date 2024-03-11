import React from 'react';
import { useTranslation } from "react-i18next"



export default function Battle() {
    const [t, i18n] = useTranslation("global")
    

    return (
        <React.Fragment>
            <h1>* BATTLE *</h1>
            <div id="enemy" className='enemy-hud'>

            </div>
            <div id="battle">

            </div>
            <div id="player" className="user-hud">
                
            </div>
        </React.Fragment>
    );
}