import React from 'react'
import { useTranslation } from "react-i18next"

export default function Header() {
    const [t, i18n] = useTranslation("global")

    return (
        <div>
            <h1 className="header">{t("header.hello-world")}</h1>
            <br /><br />
            <button onClick={() => i18n.changeLanguage("ca")}>CA</button>
            <button onClick={() => i18n.changeLanguage("es")}>ES</button>
            <button onClick={() => i18n.changeLanguage("en")}>EN</button>
        </div>
    )
}