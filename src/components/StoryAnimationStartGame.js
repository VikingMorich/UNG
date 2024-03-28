import React, {useState} from 'react';
import { useTranslation } from "react-i18next"
import Trippi from './Trippi'
import { setHistoryPage } from '../api/gameFunctions'

export default function StoryAnimation() {
    const [t, i18n] = useTranslation("global")
    const [swiped, setSwiped] = useState(false);
    const [inmerse, setInmerse] = useState(false);
    const [inmerseText, setInmerseText] = useState(false);

    const handleClick = () => {
        setSwiped(true);
        // Do something when the swipe animation is triggered
    };

    const setPageState = () => {
        setInmerse(true)
        setTimeout(()=> {
            setInmerseText(true)
            setTimeout(() => {
                setHistoryPage('page1')
            }, 1600)
        }, 1400)
    }
    
    return (
        <React.Fragment>
            <div className='story-swipe'>
                <div className={`page-swipe-animation ${swiped ? 'swiped' : ''}`} onClick={handleClick}>
                {/* You can put any content inside this component */}
                    <div className="page">
                        <div className="front">
                            <h1>{t('history-intro.start-text')}</h1>
                        </div>
                        <div className="back">
                            <Trippi />
                            <span className='link' onClick={setPageState}>{t('history-intro.continue')}</span>
                        </div>
                    </div>
                    <div className={`black-background ${inmerse ? 'ani-fade-in' : ''}`}>
                        <span className={`inmerse-text ${inmerseText ? 'ani-fade-in' : ''}`}>...</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}