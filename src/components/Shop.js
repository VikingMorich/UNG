import React from 'react';
import UserHud from './UserHud';
import ShopList from './ShopList'
import { useTranslation } from "react-i18next"

export default function Shop(props) {
    const [t] = useTranslation("global")
    
    return (
        <div className='shop-view'>
            <h1>{t('shop.title')}</h1>
            <div id="shoplist">
                <ShopList state={props.state} values={props.values} />
            </div>
            <div id="player" className="user-hud">
                <UserHud state={props.state}/>
            </div>
        </div>
    );
}