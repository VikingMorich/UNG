import React from 'react';

export default function Counter(props) {
    
    return (
        <div className='counter__container'>
            <div className='counter__button' onClick={props.decrement}>
                <p className="counter__button--value">-</p>
            </div>
            <div className="counter__screen">
                <p className="counter__value">{props.counter}</p>
            </div>
            <div className='counter__button' onClick={props.increment}>
                <p className="counter__button--value">+</p>
            </div>
        </div>
    );
}