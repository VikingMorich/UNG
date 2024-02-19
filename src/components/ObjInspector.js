import React, {useState, useEffect, useRef} from 'react';
import { useTranslation } from "react-i18next"


export default function ObjInspector(props) {
    const [t] = useTranslation("global")
    return (
        <React.Fragment>
            <div className="c-inspector-background">
                <div className="c-inspector--content">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <h2>{props.obj.name}</h2>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img className="item-img" src={props.obj.imgSrc} alt="item"/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>* Description *</span>
                                </td>
                            </tr>
                            <tr className='maximize'>
                                <td>
                                    <span>* Stats: </span>
                                    <ul>
                                        {props.obj.stats.DEF && <li>*DEF: {props.obj.stats.DEF}</li>}
                                        {props.obj.stats.ATK && <li>*ATK: {props.obj.stats.ATK}</li>}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
}