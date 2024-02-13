import fire from '../fire'
import Cookies from 'universal-cookie';

let cookies = new Cookies();
let timeExpiration = new Date(Date.now() + (1000 * 3600 * 8))

export function changeUserName(name) {
  let ref = fire.database().ref().child('Players')
  let key = cookies.get('key')
  ref.child(key).once("value", function(playersStateSnap) {
    let updates = playersStateSnap.val()
    updates['name'] = name
    ref.child(key).update(updates)
  })
}

export function setUserCharacterType(type) {
  let ref = fire.database().ref().child('Players')
  let key = cookies.get('key')
  ref.child(key).once("value", function(playersStateSnap) {
    let updates = playersStateSnap.val()
    updates['gameStates'] = {
      characterType: type,
      INT: type === 'mage' ? 75 : 50,
      FUE: type === 'warrior' ? 75 : 50,
      PUN: type === 'archer' ? 75 : 50,
      SUE: 50,
      gold: 0,
      HP: 100,
      maxHP: 100,
      EXP: 0,
      maxEXP: 200,
      ATK: 5,
      DEF: 0,
      LVL: 1,
    }
    ref.child(key).update(updates)
  }).then(resp => {
    window.location = '/game'
  })
}

export function addPlayerDB(name, email, imageUrl) {
  let ref = fire.database().ref().child('Players')
  let key = ref.push().key
  cookies.set('key', key, { path: '/', expires: timeExpiration });
  cookies.set('img', imageUrl, { path: '/', expires: timeExpiration });
  cookies.set('email', email, { path: '/', expires: timeExpiration });
  cookies.set('userName', name, { path: '/', expires: timeExpiration });
  let updates = {}
  updates[key] = {
    username: name,
    email: email,
    googleImg: imageUrl,
    dateLogin: new Date(),
  }
  ref.update(updates).then(resp => {
    window.location = '/name'
  })
}

export function checkPlayerExist(name, email, imageUrl) {
  let ref = fire.database().ref().child('Players')
  ref.once("value", function(playersStateSnap) {
    let players = playersStateSnap.val()
    let exist = false
    let key = null
    Object.keys(players).forEach(i => {
      if (players[i].email === email) {
        exist = true
        key = i
      }
    })
    if (exist) {
      cookies.set('key', key, { path: '/', expires: timeExpiration });
      cookies.set('img', imageUrl, { path: '/', expires: timeExpiration });
      cookies.set('email', email, { path: '/', expires: timeExpiration });
      cookies.set('userName', name, { path: '/', expires: timeExpiration });
    }
    else {
      addPlayerDB(name, email, imageUrl)
    }
  })
}

export function takeDmg(dmg) {
  let ref = fire.database().ref().child('Players')
  let key = cookies.get('key')
  ref.child(key).once("value", function(playersStateSnap) {
    let updates = playersStateSnap.val()
    let currentHP = updates.gameStates.HP - dmg
    if (currentHP < 0) currentHP = 0
    updates.gameStates.HP = currentHP
    ref.child(key).update(updates)
  })
}

export function usePotion(heal) {
  let ref = fire.database().ref().child('Players')
  let key = cookies.get('key')
  ref.child(key).once("value", function(playersStateSnap) {
    let updates = playersStateSnap.val()
    let currentHP = updates.gameStates.HP + heal
    if (currentHP > updates.gameStates.maxHP) currentHP = updates.gameStates.maxHP
    updates.gameStates.HP = currentHP
    ref.child(key).update(updates)
  })
}

export function winExp(exp) {
  let ref = fire.database().ref().child('Players')
  let key = cookies.get('key')
  ref.child(key).once("value", function(playersStateSnap) {
    let updates = playersStateSnap.val()
    let currentEXP = updates.gameStates.EXP + exp
    let currentLVL = updates.gameStates.LVL
    if (currentEXP >= updates.gameStates.maxEXP) {
      //make it recursive
      //probably future function to diferent upgrades in lvl up (dmg or whatever)
      currentEXP = currentEXP - updates.gameStates.maxEXP
      currentLVL += 1
    }
    updates.gameStates.EXP = currentEXP
    updates.gameStates.LVL = currentLVL
    
    ref.child(key).update(updates)
  })
}