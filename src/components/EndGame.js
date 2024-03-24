import React, {useEffect, useState} from 'react';
import { useTranslation } from "react-i18next"
import { setHistoryPage } from '../api/gameFunctions'


export default function Battle() {
    const [t, i18n] = useTranslation("global")
    const [showLogo, setShowLogo] = useState(false)

    useEffect(() => {
        setTimeout(() => { 
            setShowLogo(true)
            setTimeout(() => { 
                setShowLogo(false)
            }, 3000);
        }, 1000);
        
    }, []);

    return (
        <div className='end-game-page'>
            <div className="background-container">
                <video autoPlay muted loop className="background-video">
                    <source src="/burning-book.mp4" type="video/mp4" />
                </video>
            </div>
            <div className={`presentation ${showLogo ? '' : 'fadeIn'}`}>
                <h1>FIN</h1>
                <h2>Puesto que la muerte es inevitable, olvidémosla...</h2>
                <div className='button-restart' onClick={() => {setHistoryPage('page0')}}>
                    <span>Voler a empezar</span>
                </div>
            </div>
        </div>
    );
}