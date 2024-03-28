import React, {useState} from 'react';
import { useTranslation } from "react-i18next"
import { setHistoryPage } from '../api/gameFunctions'
import expand from "../icons/expand_more-white-18dp.svg"

export default function StoryTalk(props) {
    const [t, i18n] = useTranslation("global")
    const [swiped, setSwiped] = useState(0);

    const handleClick = () => {
        if (swiped < (props.values.text.length - 1))
            setSwiped(swiped + 1);
        // Do something when the swipe animation is triggered
        // if (swiped === 3)
        //     goToGame()
    };

    const backClick = (event) => {
        if (swiped !== 0)
            setSwiped(swiped - 1);
        event.stopPropagation();
    }
    
    return (
        <React.Fragment>
            <div className='story-talk-swipe'>
                <div className={`page-swipe-animation`} onClick={handleClick}>
                {/* You can put any content inside this component */}
                    <div>
                        <img className="background-img" alt="background" src={'./locations/' + props.values.location} />
                        <div className={`speach-wrapper`}>
                            <img className="people-img" alt="people" src={'./people/' + props.values.character + '.png'} />
                            <div className="text-wrapper">
                                {props.values.text.map((element, i) => {
                                    return (
                                    <div key={i} className={`page-text ${swiped !== i ? 'hidden' : ''}`} >
                                        <span>{t('history.' + props.pagekey + '.' + element)}</span>
                                        {(props.values.text.length - 1) === i &&
                                        <div className='op-choices'>
                                            {props.values.choices.map(el => {
                                                return (
                                                    <span key={el.name} className='link' onClick={() => {setHistoryPage(el.history)}}>{t('history.' + props.pagekey + '.' + el.name)}</span>
                                                )
                                            })}
                                            
                                        </div>
                                        }
                                    </div>)
                                })}
                                {swiped !== 0 && 
                                <div className='button-back' onClick={backClick}>
                                    <img className="back-icon" alt="back-icon" src={expand}/>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}