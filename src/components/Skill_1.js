import React, {useState, useEffect, useRef} from 'react';
import { useTranslation } from "react-i18next"

export default function Skill_1() {
    const [t, i18n] = useTranslation("global")
    const goGame = () => window.location = '/game'

    //PATILLADA CHATGPT
    const [progressValue, setProgressValue] = useState(0);
    const [direction, setDirection] = useState('right');
    const progressRef = useRef(null);
    const progressIntervalRef = useRef(null);
    const downloadSpeed = 1; // Adjust this value to set the stable speed of loading

    useEffect(() => {
        progressIntervalRef.current = setInterval(() => {
        if (progressValue < 100 && direction === 'right') {
            const newProgress = progressValue + downloadSpeed;
            setProgressValue(Math.min(newProgress, 100));
        } else if (progressValue > 0 && direction === 'left') {
            const newProgress = progressValue - downloadSpeed;
            setProgressValue(Math.max(newProgress, 0));
        } else {
            // Change direction when progress reaches end
            if (progressValue === 0) {
            setDirection('right');
            } else if (progressValue === 100) {
            setDirection('left');
            }
        }
        }, 20); // Adjust this interval for smoother animation

        return () => clearInterval(progressIntervalRef.current);
    }, [progressValue, direction, downloadSpeed]);

    const stopProgress = () => {
        // You can handle the progress value here
        console.log("Progress stopped at", progressValue);
        clearInterval(progressIntervalRef.current);
    };

    useEffect(() => {
        if (progressRef.current) {
        progressRef.current.style.width = `${progressValue}%`;
        }
    }, [progressValue]);
    //--------------
    
    return (
        <React.Fragment>
            <h1>*Skill hability*</h1>
            <ul className='ul-list'>
                <li className='link' onClick={goGame}>* Back *</li>
            </ul>
            <div>
            <div style={{ backgroundColor: '#f0f0f0', height: '30px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                <div ref={progressRef} style={{ backgroundColor: '#4caf50', height: '100%', width: '100%', transform: direction === 'right' ? 'translateX(-100%)' : 'translateX(0)', transition: 'transform 0.5s linear' }}>
                    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff' }}>{progressValue}%</span>
                </div>
                </div>
                <button onClick={stopProgress} style={{ marginTop: '10px' }}>Stop Progress</button>
            </div>
            <div id="player" className="user-hud">
                
            </div>
        </React.Fragment>
    );
}