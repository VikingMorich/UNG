import React, {useState} from 'react'
import { useTranslation } from "react-i18next"
import menu from '../icons/menu-white-18dp.svg'
import language from "../icons/language-white-18dp.svg"
import cross from '../icons/clear-white-18dp.svg'
import expand from "../icons/expand_more-white-18dp.svg"
import GoogleBtn from '../GoogleBtn'
import Cookies from 'universal-cookie';

export default function Header() {
    let cookies = new Cookies();
    const [t, i18n] = useTranslation("global")
    const [mobileMenu, setMobileMenu] = useState(false)
    const [mobileMenuType, setMobileMenuType] = useState('')


    const setLanguage = (lang) => {
        i18n.changeLanguage(lang)
        cookies.set('lang', lang, { path: '/' });
        setMobileMenuType('')
        setMobileMenu(false)
    }

    return (
        <React.Fragment>
        {mobileMenu &&
        <div className="c-header-mobileWrapper">
            <div className="c-header-mobile">
                {mobileMenuType === '' ?
                <React.Fragment>
                    <div className="c-header-mobile--baseHeader">
                        <img className="c-header-mobile--icon" alt="cross-icon" src={language} onClick={() => setMobileMenuType('language')}/>
                        <img className="c-header-mobile--icon" alt="cross-icon" src={cross} onClick={() => setMobileMenu(false)}/>
                    </div>
                    <div className="c-header-mobile--option">{t("header.music")}</div>
                    <GoogleBtn type = "header"/>
                </React.Fragment> 
                :
                <React.Fragment>
                    <div className="c-header-mobile--back" onClick={() => {setMobileMenuType('')}}>
                        <img className="c-header-mobile--icon__rotate2" alt="back-icon" src={expand}/>
                        {t("back")}
                    </div>
                </React.Fragment>
                }
                {mobileMenuType === 'language' &&
                <React.Fragment>
                    <h3 className="c-header-mobile--optionTitle centered">{t("language")}</h3>
                    <div className="c-header-mobile--option centered" onClick={() => setLanguage('ca')}>{t("languages.cat")}</div>
                    <div className="c-header-mobile--option centered" onClick={() => setLanguage('es')}>{t("languages.es")}</div>
                    <div className="c-header-mobile--option centered" onClick={() => setLanguage('en')}>{t("languages.en")}</div>
                </React.Fragment>
                }
            </div>
        </div>
        }
        <div className={`c-header`}>
            <div className="c-header-nav">
                <a href="/" className="c-header--logo">
                    <span>UNNAMEDGAME</span>
                </a>
            </div>
            <img className="c-header--icon" alt="menu-icon" src={menu} onClick={() => {setMobileMenu(true)}}/>
        </div>
        </React.Fragment>
    )
}