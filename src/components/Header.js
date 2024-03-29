import React, {useState} from 'react'
import { useTranslation } from "react-i18next"
import menu from '../icons/menu-white-18dp.svg'
import language from "../icons/language-white-18dp.svg"
import cross from '../icons/clear-white-18dp.svg'
import expand from "../icons/expand_more-white-18dp.svg"
import GoogleBtn from '../GoogleBtn'
import Cookies from 'universal-cookie';
import WikiModal from './WikiModal'

export default function Header() {
    let cookies = new Cookies();
    const [t, i18n] = useTranslation("global")
    const [mobileMenu, setMobileMenu] = useState(false)
    const [mobileMenuType, setMobileMenuType] = useState('')
    const [wikiOpen, setWikiOpen] = useState(false)


    const setLanguage = (lang) => {
        i18n.changeLanguage(lang)
        cookies.set('lang', lang, { path: '/' });
        setMobileMenuType('')
        setMobileMenu(false)
    }

    const openWiki = () => {
        setMobileMenu(false)
        setWikiOpen(true)
    }

    const closeWikiModal = () => {
        setWikiOpen(false)
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
                    <div className="c-header-mobile--option" onClick={openWiki}>{t("header.wiki")}</div>
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
                    <div className="c-header-mobile--option centered" onClick={() => setLanguage('es')}>{t("languages.es")}</div>
                    <div className="c-header-mobile--option centered" onClick={() => setLanguage('en')}>{t("languages.en")}</div>
                </React.Fragment>
                }
            </div>
        </div>
        }
        <div className={`c-header`}>
            <div className="c-header-nav">
                <a href="/start" className="c-header--logo">
                    <span>{t('game-title')}</span>
                </a>
            </div>
            <img className="c-header--icon" alt="menu-icon" src={menu} onClick={() => {setMobileMenu(true)}}/>
        </div>
        <WikiModal open={wikiOpen} toggleModal={closeWikiModal} />
        </React.Fragment>
    )
}