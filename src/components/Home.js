import React, { useState } from 'react';
import GoogleBtn from '../GoogleBtn'
import { useTranslation } from "react-i18next"
import { addPlayerDB } from "../api/gameFunctions"
import Cookies from 'universal-cookie';

let cookies = new Cookies();

export default function Home() {
    const [t, i18n] = useTranslation("global")
    const startGame = () => {
        if (!cookies.get('login')) {
            addPlayerDB('unknown', 'unknown', 'unknown')
        }
    }

    const goContact = () => {
        window.location = '/contact'
    }
    
    return (
        <React.Fragment>
            <h1>{t("home.example")}</h1>
            <div className='login-wrap'>
                <div className='c-gbutton__home' onClick={startGame}>
                    <span>* START *</span>
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
        </React.Fragment>
    );
}