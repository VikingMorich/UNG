import React from 'react';
import UserHud from './UserHud';
import ShopList from './ShopList'

export default function Shop(props) {
    
    return (
        <div className='shop-view'>
            <h1>* Tienda *</h1>
            <div id="shoplist">
                <ShopList state={props.state} values={props.values} />
            </div>
            <div id="player" className="user-hud">
                <UserHud state={props.state}/>
            </div>
        </div>
    );
}