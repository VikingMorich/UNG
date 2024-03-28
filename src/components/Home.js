import React from 'react';
import GoogleBtn from '../GoogleBtn'
import { useTranslation } from "react-i18next"
import { addPlayerDB } from "../api/gameFunctions"
import Cookies from 'universal-cookie';

let cookies = new Cookies();

export default function Home() {
    const [t] = useTranslation("global")
    const startGame = () => {
        if (!cookies.get('login')) {
            addPlayerDB('unknown', 'unknown', 'unknown')
        } else {
            window.location = '/history'
        }
    }

    const goContact = () => window.location = '/contact'
    const goCover = () => window.location = '/'
    
    return (
        <div className='home-component'>
            <h1>{t("game-title")}</h1>
            <div className='login-wrap'>
                <div className='c-gbutton__home' onClick={startGame}>
                    <span>{cookies.get('login') ? t("home.continue") : t("home.start")}</span>
                </div>
            </div>
            <div className='login-wrap'>
                <GoogleBtn />
            </div>
            <div className='login-wrap'>
                <div className='c-gbutton__home' onClick={goContact}>
                    <span>{t("contact")}</span>
                </div>
            </div>
            <div className='login-wrap'>
                <div className='c-gbutton__home' onClick={goCover}>
                    <span>{t("home.game-desc")}</span>
                </div>
            </div>
        </div>
    );
}