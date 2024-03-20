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
  const [t, i18n] = useTranslation("global");
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
    <React.Fragment>
      <h1>* Name *</h1>
      <p className="description">* Choose the name for your player</p>
      <input
        className="input-name"
        placeholder={"* Enter you name *"}
        value={name}
        onChange={handleChangeName}
      />
      <div className="button" onClick={continueClick}>
        <span>{props.values.choices[0].name}</span>
      </div>
    </React.Fragment>
  );
}
