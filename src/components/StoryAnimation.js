import React, {useState} from 'react';
import { useTranslation } from "react-i18next"

export default function StoryAnimation() {
    const [t, i18n] = useTranslation("global")
    const [swiped, setSwiped] = useState(false);
    const goToGame = () => window.location = '/game'

    const handleClick = () => {
        setSwiped(true);
        // Do something when the swipe animation is triggered
    };
    
    return (
        <React.Fragment>
            <div className='story-swipe'>
                <div className={`page-swipe-animation ${swiped ? 'swiped' : ''}`} onClick={handleClick}>
                {/* You can put any content inside this component */}
                    <div className="page">
                        <div className="front">
                            <h1>Front Page</h1>
                            <img className="background-img" alt="background" src='./quim_assets/village1.jpeg' />
                        </div>
                        <div className="back">
                            <h1>Back Page</h1>
                            <button onClick={goToGame}>* Continue *</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}