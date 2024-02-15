import firebase from 'firebase'
import React from 'react'
import ReactDOM from 'react-dom'
import Cookies from 'universal-cookie'
import UserHud from './components/UserHud'

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
      if (window.location.pathname === '/game' || window.location.pathname === '/skill'){
        if (snap.key === key) {
          let objPlayer = document.getElementById('player')
          const user = document.createElement('div')
          user.id=key
          user.className="c-roomPlayer__container"
          objPlayer.appendChild(user)
          
          ReactDOM.render(<UserHud state={snap.val()} openInv={inventoryStateOpen} />, user)
        }
      } 
  })
  dbRefPlayers.on('child_removed', snap => {
    if (snap.key === key) {
      const pRemoved = document.getElementById('player')
      if (pRemoved) pRemoved.remove()
    }
  })

  dbRefPlayers.on('child_changed', snap => {
    if (window.location.pathname === '/game' || window.location.pathname === '/skill'){
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
  })
}

