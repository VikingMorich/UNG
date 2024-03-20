import React from 'react';
import { useTranslation } from "react-i18next"


export default function History() {
    const [t, i18n] = useTranslation("global")

    return (
        <React.Fragment>
          <div id="history">

          </div>
        </React.Fragment>
    );
}