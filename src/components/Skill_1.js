import React, {useState, useEffect, useRef} from 'react';
import { useTranslation } from "react-i18next"

export default function Skill_1() {
    const [t, i18n] = useTranslation("global")
    const goGame = () => window.location = '/game'

    //PATILLADA CHATGPT
    const [progressValue, setProgressValue] = useState(0);
    const [direction, setDirection] = useState('right');
    const [lvl, setLvl] = useState(1);
    const [arrRes, setArrRes] = useState([]);
    const progressRef = useRef(null);
    const progressIntervalRef = useRef(null);
    const downloadSpeed = 1; // Adjust this value to set the stable speed of loading

    //ordered from 0 to 100
    const progressSuccess = [[15, 20], [80, 90]]

    const getComputedGradient = () => {
        let computedGradientSuccess = 'linear-gradient(90deg'
        progressSuccess.forEach((el, i) => {
            if (i === 0 && el[0] > 0) {
                computedGradientSuccess = computedGradientSuccess + ', red 0% ' + el[0] + '%'
            }
            computedGradientSuccess = computedGradientSuccess + ', green ' + el[0] + '% ' + el[1] + '%'
            if (i !== (progressSuccess.length - 1)) {
                computedGradientSuccess = computedGradientSuccess + ', red ' + el[1] + '% ' + progressSuccess[i+1][0] + '%'
            } else if (el[1] < 100) {
                computedGradientSuccess = computedGradientSuccess + ', red ' + el[1] + '%  100%'
            }
        })
        computedGradientSuccess += ')'
        return computedGradientSuccess
    }

    const setWin = (res) => {
        let x = arrRes
        x.push(res === 'win' ? '✅' : '❌')
        setArrRes(x)
    }

    const checkIfSuccess = (prog) => {
        let succ = false
        progressSuccess.forEach(el => {
            if (!succ) {
                if (prog >= el[0] && prog <= el[1]) succ = true
            }
        })
        setWin(succ ? 'win' : 'lose')
        if (lvl > 4) setTimeout(() => {clearInterval(progressIntervalRef.current)}, 100)
        else setLvl(lvl + 1)
        
    }

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
        checkIfSuccess(progressValue)
        //clearInterval(progressIntervalRef.current)
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
            <h3>LVL {lvl}</h3>
            <div style={{ backgroundImage: getComputedGradient(), height: '30px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                <div ref={progressRef} style={{ /* backgroundColor: '#000000', opacity: 0.7, */ borderRight: '5px solid black', height: '100%', width: '100%', transition: 'transform 0.5s linear' }}>
                    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff' }}>{progressValue}%</span>
                </div>
            </div>
            <div className='button-wrapper'>
                <button onClick={stopProgress} className='stop-button'>Stop Progress</button>
            </div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>{arrRes[0] || ''}</td>
                            <td>{arrRes[1] || ''}</td>
                            <td>{arrRes[2] || ''}</td>
                            <td>{arrRes[3] || ''}</td>
                            <td>{arrRes[4] || ''}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='button-wrapper'>
                <button onClick={() => window.location.reload()} className='stop-button'>Restart</button>
            </div>
            <div id="player" className="user-hud">
                
            </div>
        </React.Fragment>
    );
}