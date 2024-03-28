import React, {useEffect, useState} from 'react';
import { useTranslation } from "react-i18next"
import { setHistoryPage } from '../api/gameFunctions'


export default function Battle() {
    const [t] = useTranslation("global")
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
                <h1>{t('pageDead.title')}</h1>
                <h2>{t('pageDead.desc')}</h2>
                <div className='button-restart' onClick={() => {setHistoryPage('page0')}}>
                    <span>{t('pageDead.restart')}</span>
                </div>
            </div>
        </div>
    );
}