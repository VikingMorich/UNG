import React from 'react';
import { useTranslation } from "react-i18next"

export default function ProgressBar(props) {
    const [t, i18n] = useTranslation("global")
    const percentage =  props.value * 100 / props.maxValue
    
    return (
        <React.Fragment>
            <div className="progress" id="progressBar">
              <div className="rounded">
                <div className={"progress-bar " + props.color} style={{width: percentage + '%'}}/>
              </div>
              <div className="numbers">
                <span className="text-numbers">{props.value + ' / ' + props.maxValue}</span>
              </div>
            </div>
        </React.Fragment>
    );
}