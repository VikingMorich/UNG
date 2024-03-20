import { FlippingPages } from 'flipping-pages';
import 'flipping-pages/dist/style.css';
import { useState } from 'react';
import { setHistoryPage } from '../api/gameFunctions'

const Book = (props) => {
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
                                <span>{el}</span>
                                {props.values.resources && props.values.resources.find(el => el.slide === i) &&
                                    <img src={'./' + props.values.resources.find(el => el.slide === i).src} alt="resource"/>
                                }
                                {i === (props.values.text.length - 1) && 
                                <div className='op-choices'>
                                    {props.values.choices.map(elem => {
                                        return (
                                            <span key={elem.name} className='link' id={elem.history} onMouseDown={handleClick}>{elem.name}</span>
                                        )
                                    })}
                                </div>}
                            </div>
                        )
                    })}
                    
                </FlippingPages>
            </div>
            <div className='book-control-pages'>
                <button onClick={back} className={selected === 0 ? 'disabled' : ''}>Back</button>
                <span>{selected + 1} / {props.values.text.length}</span>
                <button onClick={next} className={selected === (props.values.text.length - 1) ? 'disabled' : ''}>Next</button>
            </div>
        </div>
    );
};

export default Book;