import React, {useState} from 'react'
import { useTranslation } from "react-i18next"
import Modal from './Modal'

export default function Cover() {
    const [t] = useTranslation("global")
    const [open, setOpen] = useState(false)
    const [type, setType] = useState('')

    const toggleModal = () => {
      setOpen(!open)
      document.body.style.overflow === "hidden" ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden"
    }
  
    const closeModal = () => {
      setOpen(false)
      document.body.style.overflow = "auto"
    }

    const goHome = () => window.location = '/home'

    return (
        <React.Fragment>
            <div className="c-cover">
                <h1 className="c-cover--title">{t("game-title")}</h1>
                <h3>{t('cover.game-desc')}</h3>
                <p>
                    {t('cover.game-privacy')}
                    <span className="cover-link" onClick={() => { toggleModal(); setType('privacy')}}>
                        {t("contact-op.privacy")}
                    </span>
                </p>
                <button className="cover-button" onClick={goHome}>* START PLAY *</button>
            </div>
            <Modal open={open} toggleModal={() => closeModal()} type={type}/>
        </React.Fragment>
    );
}