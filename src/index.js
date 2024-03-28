import React from 'react'
import { render } from 'react-dom'
import App from './App'
import './index.css'
import { I18nextProvider } from "react-i18next"
import i18next from "i18next"
import { initReactI18next } from "react-i18next";

import global_es from "./translations/es/global.json"
import global_en from "./translations/en/global.json"

i18next
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    lng: "es",
    resources: {
      es: {
        global: global_es
      },
      en: {
        global: global_en
      },
    }
  });

render(
      <div>
        <I18nextProvider i18n={i18next}>
          <App />
        </I18nextProvider>
      </div>,
  document.querySelector('#root')
)
