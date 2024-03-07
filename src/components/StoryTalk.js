import React, {useState} from 'react';
import { useTranslation } from "react-i18next"

export default function StoryTalk() {
    const [t, i18n] = useTranslation("global")
    const [swiped, setSwiped] = useState(0);
    const goToGame = () => window.location = '/game'

    const handleClick = () => {
        if (swiped < 2)
            setSwiped(swiped + 1);
        // Do something when the swipe animation is triggered
        if (swiped === 3)
            goToGame()
    };

    const changeBackground = () => {
        setSwiped(3)
    }
    
    return (
        <React.Fragment>
            <div className='story-talk-swipe'>
                <div className={`page-swipe-animation`} onClick={handleClick}>
                {/* You can put any content inside this component */}
                    <div className="page">
                        <img className="background-img" alt="background" src={swiped === 3 ? './locations/ocean3.jpeg' : './locations/beach.jpeg'} />
                        <div className={`speach-wrapper ${swiped === 3 ? 'hidden' : ''}`}>
                            <img className="people-img" alt="people" src='./people/shaman.png' />
                            <div className="text-wrapper">
                                <div className={`page-text ${swiped !== 0 ? 'hidden' : ''}`} >
                                    <span>* Hace un dia precioso no crees? *</span>
                                </div>
                                <div className={`page-text ${swiped !== 1 ? 'hidden' : ''}`} >
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
                                </div>
                                <div className={`page-text ${swiped !== 2 ? 'hidden' : ''}`} >
                                    <span>* Si me ganas a una carrera hasta la otra isla te invito a un cóctel *</span>
                                    <div className='op-choices'>
                                        <span className='link' onClick={changeBackground}>Aceptar</span>
                                        <span className='link' onClick={goToGame}>Volver</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}