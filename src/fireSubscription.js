import firebase from 'firebase'
import React from 'react'
import ReactDOM from 'react-dom'
import Cookies from 'universal-cookie'
import UserHud from './components/old/UserHud'
import EnemyHud from './components/EnemyHud'
import ShopList from './components/old/ShopList_old'
import BattlePage from './components/BattlePage'
import HistoryPage from './components/HistoryPage'

export let inventoryStateOpen = false

export function setInventoryStateOpen(val) {
  inventoryStateOpen = val
}

export function initSubscriptions() {
  let cookies = new Cookies();
  let key = cookies.get('key');
  let dbRefPlayers = firebase.database().ref().child('Players');

  // db functions working
  //review to take just the current player

  dbRefPlayers.on('child_added', snap => {
      if (window.location.pathname === '/game' || window.location.pathname === '/skill' || window.location.pathname === '/battle' || window.location.pathname === '/shop'){
        if (snap.key === key) {
          let objPlayer = document.getElementById('player')
          const user = document.createElement('div')
          user.id=key
          user.className="c-roomPlayer__container"
          objPlayer.appendChild(user)
          
          ReactDOM.render(<UserHud state={snap.val()} openInv={inventoryStateOpen} />, user)
        }
      }
      if (window.location.pathname === '/battle'){
        if (snap.key === key) {
          let objBattle = document.getElementById('battle')
          const battle = document.createElement('div')
          battle.id='currentBattle'
          //objEnemy.appendChild(enemy)
          ReactDOM.render(<BattlePage state={snap.val().gameStates } />, battle)
          let battleChanged = document.getElementById('currentBattle')
          if (battleChanged){
            objBattle.replaceChild(battle, battleChanged)
          } else {
              objBattle.appendChild(battle)
          }
        }
        if (snap.key === key) {
          let objEnemy = document.getElementById('enemy')
          const enemy = document.createElement('div')
          enemy.id='currentEnemy'
          enemy.className="c-roomPlayer__container"
          //objEnemy.appendChild(enemy)
          ReactDOM.render(<EnemyHud state={snap.val().gameStates.battle} username={snap.val().username} />, enemy)
          let enemyChanged = document.getElementById('currentEnemy')
          if (enemyChanged){
            objEnemy.replaceChild(enemy, enemyChanged)
          } else {
              objEnemy.appendChild(enemy)
          }
        }
      }
      if (window.location.pathname === '/shop'){
        if (snap.key === key) {
          let objShop = document.getElementById('shoplist')
          const shop = document.createElement('div')
          shop.id='currentShop'
          //objShop.appendChild(enemy)
          ReactDOM.render(<ShopList state={snap.val()} />, shop)
          let shopChanged = document.getElementById('currentShop')
          if (shopChanged){
            objShop.replaceChild(shop, shopChanged)
          } else {
              objShop.appendChild(shop)
          }
        }
      }
      if (window.location.pathname === '/history'){
        if (snap.key === key) {
          let objGame = document.getElementById('history')
          const game = document.createElement('div')
          game.id='currentGame'
          ReactDOM.render(<HistoryPage state={snap.val()} />, game)
          let gameChanged = document.getElementById('currentGame')
          if (gameChanged){
            objGame.replaceChild(game, gameChanged)
          } else {
              objGame.appendChild(game)
          }
        }
      }
  })
  dbRefPlayers.on('child_removed', snap => {
    if (snap.key === key) {
      const pRemoved = document.getElementById('player')
      const eRemoved = document.getElementById('enemy')
      if (pRemoved) pRemoved.remove()
      if (eRemoved) eRemoved.remove()
    }
  })

  dbRefPlayers.on('child_changed', snap => {
    if (window.location.pathname === '/game' || window.location.pathname === '/skill' || window.location.pathname === '/battle' || window.location.pathname === '/shop'){
      if (snap.key === key) {
        let playerChanged = document.getElementById(snap.key)
        let objPlayer = document.getElementById('player')
        const user = document.createElement('div')
        user.id=key
        user.className="c-roomPlayer__container"
        objPlayer.appendChild(user)
        ReactDOM.render(<UserHud state={snap.val()}/>, user)
        if (playerChanged){
          objPlayer.replaceChild(user, playerChanged)
        } else {
            objPlayer.appendChild(user)
        }
      }
    }
    if (window.location.pathname === '/battle') {
      if (snap.key === key) {
        let objBattle = document.getElementById('battle')
        const battle = document.createElement('div')
        battle.id='currentBattle'
        //objEnemy.appendChild(enemy)
        ReactDOM.render(<BattlePage state={snap.val().gameStates } />, battle)
        let battleChanged = document.getElementById('currentBattle')
        if (battleChanged){
          objBattle.replaceChild(battle, battleChanged)
        } else {
            objBattle.appendChild(battle)
        }
      }
      if (snap.key === key) {
        let enemyChanged = document.getElementById('currentEnemy')
        let objEnemy = document.getElementById('enemy')
        const enemy = document.createElement('div')
        enemy.id='currentEnemy'
        enemy.className="c-roomPlayer__container"
        objEnemy.appendChild(enemy)
        ReactDOM.render(<EnemyHud state={snap.val().gameStates.battle} username={snap.val().username}/>, enemy)
        if (enemyChanged){
          objEnemy.replaceChild(enemy, enemyChanged)
        } else {
            objEnemy.appendChild(enemy)
        }
      }
    }
    if (window.location.pathname === '/shop'){
      if (snap.key === key) {
        let objShop = document.getElementById('shoplist')
        const shop = document.createElement('div')
        shop.id='currentShop'
        //objShop.appendChild(enemy)
        ReactDOM.render(<ShopList state={snap.val()} />, shop)
        let shopChanged = document.getElementById('currentShop')
        if (shopChanged){
          objShop.replaceChild(shop, shopChanged)
        } else {
            objShop.appendChild(shop)
        }
      }
    }
    if (window.location.pathname === '/history'){
      if (snap.key === key) {
        let objGame = document.getElementById('history')
        const game = document.createElement('div')
        game.id='currentGame'
        ReactDOM.render(<HistoryPage state={snap.val()} />, game)
        let gameChanged = document.getElementById('currentGame')
        if (gameChanged){
          objGame.replaceChild(game, gameChanged)
        } else {
            objGame.appendChild(game)
        }
      }
    }
  })

}

