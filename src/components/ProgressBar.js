import React from 'react';
import { useTranslation } from "react-i18next"

export default function ProgressBar(props) {
    const [t, i18n] = useTranslation("global")
    const percentage =  props.value * 100 / props.maxValue
    const percentage2 =  props.lastAttack !== 0 ? props.lastAttack * 100 / props.maxValue : 0
    
    return (
        <React.Fragment>
            <div className="progress" id="progressBar">
              <div className="rounded">
                <div className={"progress-bar " + props.color} style={{width: percentage + '%'}}/>
                {props.lastAttack !== 0 &&
                <div className={"progress-bar dark-" + props.color} style={{width: percentage2 + '%'}}/>
                }
              </div>
              <div className="numbers">
                <span className="text-numbers">{props.value + ' / ' + props.maxValue}</span>
              </div>
            </div>
        </React.Fragment>
    );
}