import { FlippingPages } from 'flipping-pages';
import { useTranslation } from "react-i18next"
import 'flipping-pages/dist/style.css';
import { useState } from 'react';
import { setHistoryPage } from '../api/gameFunctions'

const Book = (props) => {
    const [t] = useTranslation("global");
    const [selected, setSelected] = useState(0);

    const back = () => {
        setSelected(selected => Math.max(selected - 1, 0));
    };

    const next = () => {
        setSelected(selected => Math.min(selected + 1, (props.values.text.length - 1)));
    };

    const handleClick = (ev) => {
        if (ev.target.classList.contains('link')) {
            setHistoryPage(ev.target.id)
        }
    }

    return (
        <div>
            <div className="pages">
                <FlippingPages
                    direction="right-to-left"
                    onSwipeEnd={setSelected}
                    selected={selected}
                >
                    {props.values.text.map((el, i) => {
                        return (
                            <div key={i} className="book-page">
                                {props.values.resources && props.values.resources.find(el => el.slide === i) &&
                                    <img src={'./' + props.values.resources.find(el => el.slide === i).src} alt="resource"/>
                                }
                                <span>{t('history.'+props.pagekey+'.'+el)}</span>
                                {i === (props.values.text.length - 1) && 
                                <div className='op-choices'>
                                    {props.values.choices.map(elem => {
                                        return (
                                            <span key={elem.name} className='link' id={elem.history} onMouseDown={handleClick}>{t('history.'+props.pagekey+'.'+elem.name)}</span>
                                        )
                                    })}
                                </div>}
                            </div>
                        )
                    })}
                    
                </FlippingPages>
            </div>
            <div className='book-control-pages'>
                <button onClick={back} className={selected === 0 ? 'disabled' : ''}>{t('prev')}</button>
                <span>{selected + 1} / {props.values.text.length}</span>
                <button onClick={next} className={selected === (props.values.text.length - 1) ? 'disabled' : ''}>{t('next')}</button>
            </div>
        </div>
    );
};

export default Book;