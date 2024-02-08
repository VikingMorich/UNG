import React, { useState } from 'react';
import GoogleBtn from '../GoogleBtn'
import { useTranslation } from "react-i18next"

export default function Home() {
    const [t, i18n] = useTranslation("global")
    const [count, setCount] = useState(0);
    const startGame = () => {
        window.location = '/name'
    }
    
    return (
        <React.Fragment>
            <h1>{t("home.example")}</h1>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
            <div className='login-wrap'>
                <div className='c-gbutton__home' onClick={startGame}>
                    <span>*START*</span>
                </div>
            </div>
            <div className='login-wrap'>
                <GoogleBtn />
            </div>
        </React.Fragment>
    );
}