import React from 'react';
import { useTranslation } from "react-i18next"

export default function Home() {
    const [t, i18n] = useTranslation("global")
    
    return (
        <React.Fragment>
            <h1>*CharacterSelection*</h1>
        </React.Fragment>
    );
}