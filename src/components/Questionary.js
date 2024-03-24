import React, {useState} from 'react';
import { useTranslation } from "react-i18next"
import expand from "../icons/expand_more-white-18dp.svg"
import {RadioButton, RadioButtonChecked} from './icon/icon'
import { questionaryData } from '../api/gameHistory'
import { setCompanion } from '../api/gameFunctions'

export default function Questionary(props) {
    const [t, i18n] = useTranslation("global")
    const [swiped, setSwiped] = useState(0);
    const [questRes, setQuestRes] = useState([]);

    const handleClick = (val, i) => {
        let x = [...questRes]
        if (!x[i])
            x.push(val)
        else
            x[i] = val
        setQuestRes(x)
        setTimeout(() => {
            if (swiped < (questionaryData.length - 1))
            setSwiped(swiped + 1);
        }, 500)
    };

    const backClick = () => {
        if (swiped !== 0)
            setSwiped(swiped - 1);
    }

    const nextClick = () => {
        if (swiped < (questionaryData.length - 1))
            setSwiped(swiped + 1);
    }

    const calculateScore = () => {
        let finalScore = {
            eagle: 0,
            deer: 0,
            boar: 0,
            snake: 0,
            wolf: 0,
            otter: 0,
            fox: 0,
        }
        questRes.forEach((el, i) => {
            let partialScore = questionaryData[i].options.find(e => e.text === el).scorce
            Object.keys(partialScore).forEach(op => {
                finalScore[op] += partialScore[op]
            })
        })
        let finalResult = null
        Object.keys(finalScore).forEach(an => {
            if (!finalResult) {
                finalResult = {name: an, score: finalScore[an]}
            } else if (finalResult.score < finalScore[an]) {
                finalResult = {name: an, score: finalScore[an]}
            }
        })
        setCompanion(finalResult.name, props.end)
        alert(finalResult.name)
    }
    
    return (
        <React.Fragment>
            <div className='questionary-swipe'>
                <div className={`page-swipe-animation`}>
                {/* You can put any content inside this component */}
                    <div className="question-page">
                        <div className='page-container'>
                            <div className='questionary-info'>
                                <span>{questRes.length}/{questionaryData.length} preguntas respondidas</span>
                            </div>
                            {questionaryData.map((el, i) => {
                                return (
                                    <div key={i} className={`page-text ${swiped !== i ? 'hidden' : ''}`} >
                                        <h3>{el.quest}</h3>
                                        <div className='op-choices'>
                                            {el.options.map(op => {
                                                return (
                                                    <div key={op.text} className='opt' onClick={() => handleClick(op.text, i)}>
                                                        <div className='op-check'>
                                                            {questRes[i] === op.text ? <RadioButtonChecked /> : <RadioButton />}
                                                        </div>
                                                        <span>{op.text}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                    </div>
                                )
                            })}
                        </div>
                        <div className={`speach-wrapper`}>
                            <img className="people-img" alt="people" src='./people/shaman.png' />
                            <div className="text-wrapper">
                                <div className={`page-text`} >
                                    <span>Responde a todas las preguntas para obtener un resultado...</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    {swiped !== 0 && 
                    <div className='button-back' onClick={backClick}>
                        <img className="back-icon" alt="back-icon" src={expand}/>
                    </div>}
                    {swiped < questRes.length && swiped !== (questionaryData.length - 1) && 
                    <div className='button-next' onClick={nextClick}>
                        <img className="next-icon" alt="back-icon" src={expand}/>
                    </div>}
                    {questRes.length === questionaryData.length && 
                    <div className='button-result' onClick={calculateScore} >
                        <span>Calcular resultado</span>
                    </div>}
                </div>
            </div>
        </React.Fragment>
    );
}