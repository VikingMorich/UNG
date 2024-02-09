import React, { useState } from 'react';
import GoogleBtn from '../GoogleBtn'
import { useTranslation } from "react-i18next"
import { addPlayerDB } from "../api/gameFunctions"

export default function Home() {
    const [t, i18n] = useTranslation("global")
    const startGame = () => {
        addPlayerDB('unknown', 'unknown', 'unknown')
        window.location = '/name'
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
        </React.Fragment>
    );
}