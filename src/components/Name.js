import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { changeUserName, getLogedUsername } from "../api/gameFunctions";
import { setHistoryPage } from '../api/gameFunctions'

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return [value, handleChange, setValue];
}

export default function Name(props) {
  const [t] = useTranslation("global");
  const [name, handleChange, setName] = useInput("");
    
  useEffect(() => {
    getLogedUsername().then((value) => setName(value.val()))
  }, []);

  const continueClick = () => {
    changeUserName(name);
    setHistoryPage(props.values.choices[0].history)
  };

  function handleChangeName(e) {
    handleChange(e);
  }

  return (
    <div className="character-name">
      <h1>{t('charname.title')}</h1>
      <p className="description">{t('charname.subtitle')}</p>
      <input
        className="input-name"
        placeholder={t('charname.placeholder')}
        value={name}
        onChange={handleChangeName}
      />
      <div className="button" onClick={continueClick}>
        <span>{t('continue')}</span>
      </div>
    </div>
  );
}
