import fire from '../fire'
import Cookies from 'universal-cookie';
import ReactDOM from 'react-dom'
import { Fail } from '../components/icon/icon'
import { itemsList } from './gameDatabase';

let cookies = new Cookies();
let timeExpiration = new Date(Date.now() + (1000 * 3600 * 8))

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getLogedUsername() {
  let ref = fire.database().ref().child('Players')
  let key = cookies.get('key')
  return ref.child(key).child('username').once("value", function(playersStateSnap) {
    return playersStateSnap.val()
  })
}

export function getCurrentGold() {
  let ref = fire.database().ref().child('Players')
  let key = cookies.get('key')
  return ref.child(key).child('gameStates').child('gold').once("value", function(goldSnap) {
    return goldSnap.val()
  })
}

export function changeUserName(name) {
  let ref = fire.database().ref().child('Players')
  let key = cookies.get('key')
  ref.child(key).once("value", function(playersStateSnap) {
    let updates = playersStateSnap.val()
    updates['username'] = name
    ref.child(key).update(updates).then(() => {
      window.location = '/character-selection'
    })
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
      ATK: 1,
      DEF: 0,
      LVL: 1,
    }
    //
    updates.gameStates['backpack'] = {}
    // let harcodedObjects = [{name: '* Wood *', type: 'none', count: 20, equiped: false}]
    // harcodedObjects.forEach(el => {
    //   let objkey = ref.push().key
    //   updates.gameStates.backpack[objkey] = {
    //     name: el.name,
    //     count: el.count,
    //     type: el.type,
    //     equiped: el.equiped
    //   }
    // })
    

    ref.child(key).update(updates)
  }).then(() => {
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
  ref.update(updates).then(() => {
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

export function useBackpackPotion(obj) {
  let heal = 20
  let ref = fire.database().ref().child('Players')
  let key = cookies.get('key')
  ref.child(key).once("value", function(playersStateSnap) {
    let updates = playersStateSnap.val()
    let currentHP = updates.gameStates.HP + heal
    if (currentHP > updates.gameStates.maxHP) currentHP = updates.gameStates.maxHP
    updates.gameStates.HP = currentHP
    //remove the potion
    if (updates.gameStates.backpack[obj].count === 1) {
      updates.gameStates.backpack[obj] = null
    } else {
      updates.gameStates.backpack[obj].count = updates.gameStates.backpack[obj].count - 1
    }
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
    let currentSkillPoints = updates.gameStates.skillPoints || 0
    let currentAtk = updates.gameStates.ATK
    if (currentEXP >= updates.gameStates.maxEXP) {
      //make it recursive
      //probably future function to diferent upgrades in lvl up (dmg or whatever)
      currentEXP = currentEXP - updates.gameStates.maxEXP
      currentLVL += 1
      currentSkillPoints += 1
      currentAtk += 1
    }
    updates.gameStates.EXP = currentEXP
    updates.gameStates.LVL = currentLVL
    updates.gameStates.ATK = currentAtk
    updates.gameStates.skillPoints = currentSkillPoints
    
    ref.child(key).update(updates)
  })
}

// export function winRandomGold(gold) {
//   let ref = fire.database().ref().child('Players')
//   let key = cookies.get('key')
//   ref.child(key).once("value", function(playersStateSnap) {
//     let updates = playersStateSnap.val()
//     let currentGold = updates.gameStates.gold + getRandomInt(gold)
//     updates.gameStates.gold = currentGold
//     ref.child(key).update(updates)
//   })
// }

export function getSellPrice(obj) {
  if (obj) {
    let objInfo = Object.keys(itemsList).map(el => {
      return itemsList[el].map(ele => ele)
    }).flat(1).find(el => el.name === obj)
    return objInfo.sellPrice
  }
  else return
}

export function sellObj(obj, price) {
  let key = cookies.get('key')
  let ref = fire.database().ref().child('Players/' + key + '/gameStates')
  ref.once("value", function(gameStates) {
    let updates = gameStates.val()
    let currentKeyCount = updates.backpack[obj].count
    if (currentKeyCount === 1) {
      //CHECK EQUIPED OBJ
      if (updates.backpack[obj].equiped) {
        if(updates.backpack[obj].stats.ATK) {
          updates.ATK = updates.ATK - updates.backpack[obj].stats.ATK
        }
        if (updates.backpack[obj].stats.DEF) {
          updates.DEF = updates.DEF - updates.backpack[obj].stats.DEF
        }
      }
      //delete key
      updates.backpack[obj] = null
    } else {
      updates.backpack[obj].count = currentKeyCount - 1
    }
    updates.gold += price
    ref.update(updates)
  })//.then(() => { window.location.reload() })

}

export function deleteObj(obj) {
  let key = cookies.get('key')
  let ref = fire.database().ref().child('Players/' + key + '/gameStates/backpack')
  ref.once("value", function(backpackSnap) {
    let updates = backpackSnap.val()
    let currentKeyCount = updates[obj].count
    if (currentKeyCount === 1) {
      //delete key
      updates[obj] = null
      ref.update(updates)
    } else {
      updates[obj].count = currentKeyCount - 1
      ref.update(updates)
    }
  })
}

export function equipObj(obj) {
  let key = cookies.get('key')
  let ref = fire.database().ref().child('Players/' + key + '/gameStates')
  ref.once("value", function(backpackSnap) {
    let updates = backpackSnap.val()
    let currentEquip = Object.keys(updates.backpack).find(el => updates.backpack[el].type === updates.backpack[obj].type && updates.backpack[el].equiped )
    if (currentEquip) {
      //UPDATE STATES
      if (updates.backpack[currentEquip].stats.DEF) updates.DEF = updates.DEF - updates.backpack[currentEquip].stats.DEF
      if (updates.backpack[currentEquip].stats.ATK) updates.ATK = updates.ATK - updates.backpack[currentEquip].stats.ATK
      updates.backpack[currentEquip].equiped = false
    }
    //two hand rules
    if (!currentEquip && updates.backpack[obj].type === 'twoHand') {
      let newType = 'firstHand'
      currentEquip = Object.keys(updates.backpack).find(el => updates.backpack[el].type === newType && updates.backpack[el].equiped )
      if (currentEquip) {
        //UPDATE STATES
        if (updates.backpack[currentEquip].stats.DEF) updates.DEF = updates.DEF - updates.backpack[currentEquip].stats.DEF
        if (updates.backpack[currentEquip].stats.ATK) updates.ATK = updates.ATK - updates.backpack[currentEquip].stats.ATK
        updates.backpack[currentEquip].equiped = false
      }
      newType = 'secondHand'
      currentEquip = Object.keys(updates.backpack).find(el => updates.backpack[el].type === newType && updates.backpack[el].equiped )
      if (currentEquip) {
        //UPDATE STATES
        if (updates.backpack[currentEquip].stats.DEF) updates.DEF = updates.DEF - updates.backpack[currentEquip].stats.DEF
        if (updates.backpack[currentEquip].stats.ATK) updates.ATK = updates.ATK - updates.backpack[currentEquip].stats.ATK
        updates.backpack[currentEquip].equiped = false
      }
    }
    else if (!currentEquip && (updates.backpack[obj].type === 'firstHand' || updates.backpack[obj].type === 'secondHand')) {
      let newType = 'twoHand'
      currentEquip = Object.keys(updates.backpack).find(el => updates.backpack[el].type === newType && updates.backpack[el].equiped )
      if (currentEquip) {
        //UPDATE STATES
        if (updates.backpack[currentEquip].stats.DEF) updates.DEF = updates.DEF - updates.backpack[currentEquip].stats.DEF
        if (updates.backpack[currentEquip].stats.ATK) updates.ATK = updates.ATK - updates.backpack[currentEquip].stats.ATK
        updates.backpack[currentEquip].equiped = false
      }
    }
    updates.backpack[obj].equiped = true
    //UPDATE STATES
    if (updates.backpack[obj].stats.DEF) updates.DEF = updates.DEF + updates.backpack[obj].stats.DEF
    if (updates.backpack[obj].stats.ATK) updates.ATK = updates.ATK + updates.backpack[obj].stats.ATK
    ref.update(updates)
  })
}

export function unequipObj(obj) {
  let key = cookies.get('key')
  let ref = fire.database().ref().child('Players/' + key + '/gameStates')
  ref.once("value", function(backpackSnap) {
    let updates = backpackSnap.val()
    if (updates.backpack[obj].stats.DEF) updates.DEF = updates.DEF - updates.backpack[obj].stats.DEF
    if (updates.backpack[obj].stats.ATK) updates.ATK = updates.ATK - updates.backpack[obj].stats.ATK
    updates.backpack[obj].equiped = false
    ref.update(updates)
  })
}

export function saveReward(gold, obj) {
  let ref = fire.database().ref().child('Players')
  let key = cookies.get('key')
  ref.child(key).once("value", function(playersStateSnap) {
    let updates = playersStateSnap.val()
    updates.gameStates.gold += gold
    let exist = updates.gameStates.backpack && Object.keys(updates.gameStates.backpack).find(el => updates.gameStates.backpack[el].name === obj.name)
    if (exist) {
      updates.gameStates.backpack[exist].count += 1
    } else {
      let Objkey = ref.push().key
      let hasBackpack = updates.gameStates.backpack ? true : false
      if (!hasBackpack)
        updates.gameStates.backpack = {
          [Objkey] : {
            name: obj.name,
            count: obj.count,
            type: obj.type,
            objType: obj.objType || null,
            stateUsed: obj.stateUsed || null,
            stats: obj.stats || null,
            imgSrc: obj.imgSrc || null,
            description: obj.description || null,
            equiped: false
          }
        }
      else {
        updates.gameStates.backpack[Objkey] = {
          name: obj.name,
          count: obj.count,
          type: obj.type,
          objType: obj.objType || null,
          stateUsed: obj.stateUsed || null,
          stats: obj.stats || null,
          description: obj.description || null,
          imgSrc: obj.imgSrc || null,
          equiped: false
        }
      }
    }
    ref.child(key).update(updates)
  }).then(() => {
    window.location = '/game'
  })
}

export function getRandomEnemy(enemy) {
  let key = cookies.get('key')
  let ref = fire.database().ref().child('Players/' + key + '/gameStates')
  ref.once("value", function(backpackSnap) {
    let updates = backpackSnap.val()
    updates['battle'] = enemy
    ref.update(updates)
  }).then(() => {
    window.location = '/battle'
  })
}

export function rollDices(num, typeAttack) {
  let key = cookies.get('key')
  let ref = fire.database().ref().child('Players/' + key + '/gameStates')
  ref.once("value", function(snap) {

    //PLAYER

    let updates = snap.val()
    let d1 = getRandomInt(100)
    let d2 = getRandomInt(100)
    let d3 = getRandomInt(100)
    let frontDiceFace1 = document.getElementById("dice-1").getElementsByClassName('data-side-1')
    let frontDiceFace2 = document.getElementById("dice-2").getElementsByClassName('data-side-1')
    let frontDiceFace3 = document.getElementById("dice-3").getElementsByClassName('data-side-1')
    let multiplier = 0
    //getWeaponState
    let equipedItems = updates.backpack ? Object.keys(updates.backpack).filter(el => {
          return updates.backpack[el].equiped
      }).map(elem => {
          return {
              key: elem,
              state: updates.backpack[elem]
          }
      }) : []
    
    let type = equipedItems.find(el => el.state.type === 'firstHand')?.state.stateUsed || equipedItems.find(el => el.state.type === 'twoHand')?.state.stateUsed || 'FUE'

    if( d1 <= snap.val()[type]) {
      //acert
      let diceValue = document.createElement('div')
      ReactDOM.render(<span>{type === 'FUE' ? '💪🏻' : type === 'INT' ? '🧠' : type === 'PUN' ? '👁️' : '🍀'}</span>, diceValue)
      frontDiceFace1[0].appendChild(diceValue)
      multiplier += 1
    } else {
      //fallo
      let diceValue = document.createElement('div')
      ReactDOM.render(<Fail/>, diceValue)
      frontDiceFace1[0].appendChild(diceValue)
    }
    if( d2 <= snap.val()[type]) {
      //acert
      let diceValue = document.createElement('div')
      ReactDOM.render(<span>{type === 'FUE' ? '💪🏻' : type === 'INT' ? '🧠' : type === 'PUN' ? '👁️' : '🍀'}</span>, diceValue)
      frontDiceFace2[0].appendChild(diceValue)
      multiplier += 1
    } else {
      //fallo
      let diceValue = document.createElement('div')
      ReactDOM.render(<Fail/>, diceValue)
      frontDiceFace2[0].appendChild(diceValue)
    }
    if( d3 <= snap.val()[type]) {
      //acert
      let diceValue = document.createElement('div')
      ReactDOM.render(<span>{type === 'FUE' ? '💪🏻' : type === 'INT' ? '🧠' : type === 'PUN' ? '👁️' : '🍀'}</span>, diceValue)
      frontDiceFace3[0].appendChild(diceValue)
      multiplier += 1
    } else {
      //fallo
      let diceValue = document.createElement('div')
      ReactDOM.render(<Fail/>, diceValue)
      frontDiceFace3[0].appendChild(diceValue)
    }

    //ENEMY
    setTimeout(() => {
      let ed1 = getRandomInt(100)
    let ed2 = getRandomInt(100)
    let ed3 = getRandomInt(100)
    let efrontDiceFace1 = document.getElementById("e-dice-1").getElementsByClassName('data-side-1')
    let efrontDiceFace2 = document.getElementById("e-dice-2").getElementsByClassName('data-side-1')
    let efrontDiceFace3 = document.getElementById("e-dice-3").getElementsByClassName('data-side-1')
    let emultiplier = 0

    if( ed1 <= snap.val().battle.FUE) {
      //acert
      let diceValue = document.createElement('div')
      ReactDOM.render(<span>💪🏻</span>, diceValue)
      efrontDiceFace1[0].appendChild(diceValue)
      emultiplier += 1
    } else {
      //fallo
      let diceValue = document.createElement('div')
      ReactDOM.render(<Fail/>, diceValue)
      efrontDiceFace1[0].appendChild(diceValue)
    }
    if( ed2 <= snap.val().battle.FUE) {
      //acert
      let diceValue = document.createElement('div')
      ReactDOM.render(<span>💪🏻</span>, diceValue)
      efrontDiceFace2[0].appendChild(diceValue)
      emultiplier += 1
    } else {
      //fallo
      let diceValue = document.createElement('div')
      ReactDOM.render(<Fail/>, diceValue)
      efrontDiceFace2[0].appendChild(diceValue)
    }
    if( ed3 <= snap.val().battle.FUE) {
      //acert
      let diceValue = document.createElement('div')
      ReactDOM.render(<span>💪🏻</span>, diceValue)
      efrontDiceFace3[0].appendChild(diceValue)
      emultiplier += 1
    } else {
      //fallo
      let diceValue = document.createElement('div')
      ReactDOM.render(<Fail/>, diceValue)
      efrontDiceFace3[0].appendChild(diceValue)
    }

    //UPDATE STATES

    let enemyDmg = (emultiplier * updates.battle.ATK) - updates.DEF
    if (enemyDmg < 0) enemyDmg = 0
    let currentLive = updates.HP - enemyDmg
    let playerDmg = (multiplier * updates.ATK) - updates.battle.DEF
    if (playerDmg < 0) playerDmg = 0
    let currentEnemyLive = updates.battle.HP - playerDmg
    updates.battle.lastEnemyDmg = enemyDmg
    updates.battle.lastPlayerDmg = playerDmg
    if (currentLive < 0) currentLive = 0
    if (currentEnemyLive < 0) currentEnemyLive = 0
    updates.HP = currentLive
    updates.battle.HP = currentEnemyLive
    ref.update(updates)
    }, 500)
    

    //CLEAN DICE ICONS

    setTimeout(() => { 
      let frontDiceFace1 = document.getElementById("dice-1").getElementsByClassName('data-side-1')
      let frontDiceFace2 = document.getElementById("dice-2").getElementsByClassName('data-side-1')
      let frontDiceFace3 = document.getElementById("dice-3").getElementsByClassName('data-side-1')
      let efrontDiceFace1 = document.getElementById("e-dice-1").getElementsByClassName('data-side-1')
      let efrontDiceFace2 = document.getElementById("e-dice-2").getElementsByClassName('data-side-1')
      let efrontDiceFace3 = document.getElementById("e-dice-3").getElementsByClassName('data-side-1')
      frontDiceFace1[0].innerHTML = ''
      frontDiceFace2[0].innerHTML = ''
      frontDiceFace3[0].innerHTML = ''
      efrontDiceFace1[0].innerHTML = ''
      efrontDiceFace2[0].innerHTML = ''
      efrontDiceFace3[0].innerHTML = ''
    }, 2500);
  })
}


export function saveBattleReward(reward) {
  let key = cookies.get('key')
  let ref = fire.database().ref().child('Players/' + key + '/gameStates')
  ref.once("value", function(snap) {
    let updates = snap.val()
    reward.forEach(el => {
      if(el.type === 'coins') updates.gold = updates.gold + el.count
      if(el.type === 'EXP') {
        let currentEXP = updates.EXP + el.count
        //LVL UP
        if(currentEXP >= updates.maxEXP) {
          updates.LVL = updates.LVL + 1
          currentEXP -= updates.maxEXP
          updates.ATK += 1
          updates.skillPoints = (updates.skillPoints || 0) + 1
          if(currentEXP >= updates.maxEXP) {
            updates.LVL = updates.LVL + 1
            currentEXP -= updates.maxEXP
            updates.ATK += 1
            updates.skillPoints = (updates.skillPoints || 0) + 1
          }
        }
        updates.EXP = currentEXP
      }
    })
    updates.battle.endBattle = true
    ref.update(updates).then(() => window.location = '/game')
    
  })
}

export function buyObj(obj) {
  let objInfo = Object.keys(itemsList).map(el => {
      return itemsList[el].map(ele => ele)
  }).flat(1).find(el => el.name === obj)
  let ref = fire.database().ref().child('Players')
  let key = cookies.get('key')
  ref.child(key).once("value", function(playersStateSnap) {
    let updates = playersStateSnap.val()
    updates.gameStates.gold -= objInfo.gold
    let exist = updates.gameStates.backpack && Object.keys(updates.gameStates.backpack).find(el => updates.gameStates.backpack[el].name === objInfo.name)
    if (exist) {
      updates.gameStates.backpack[exist].count += 1
    } else {
      let Objkey = ref.push().key
      let hasBackpack = updates.gameStates.backpack ? true : false
      if (!hasBackpack)
        updates.gameStates.backpack = {
          [Objkey] : {
            name: objInfo.name,
            count: objInfo.count,
            type: objInfo.type,
            objType: objInfo.objType || null,
            stateUsed: objInfo.stateUsed || null,
            stats: objInfo.stats || null,
            description: objInfo.description || null,
            imgSrc: objInfo.imgSrc || null,
            equiped: false
          }
        }
      else {
        updates.gameStates.backpack[Objkey] = {
          name: objInfo.name,
          count: objInfo.count,
          type: objInfo.type,
          objType: objInfo.objType || null,
          description: objInfo.description || null,
          stateUsed: objInfo.stateUsed || null,
          stats: objInfo.stats || null,
          imgSrc: objInfo.imgSrc || null,
          equiped: false
        }
      }
    }
    ref.child(key).update(updates)
  })//.then(() => { window.location.reload() })
}

export function getGameStates() {
  let ref = fire.database().ref().child('Players')
  let key = cookies.get('key')
  return ref.child(key).child('gameStates').once("value", function(gameStates) {
    return gameStates.val()
  })
}

export function saveSkillPoints(skills, cost) {
  let key = cookies.get('key')
  let ref = fire.database().ref().child('Players/' + key + '/gameStates')
  ref.once("value", function(gameStates) {
    let updates = gameStates.val()
    let learned = updates.learnedSkills ? updates.learnedSkills : []
    updates.learnedSkills = learned.concat(skills)
    updates.skillPoints = updates.skillPoints - cost
    if (skills.includes('Health')) {
      updates.maxHP = updates.maxHP + 10
      updates.HP = updates.HP + 10
    }
    if (skills.includes('Strength')) {
      updates.FUE = updates.FUE + 3
    }
    if (skills.includes('Intelectual')) {
      updates.INT = updates.INT + 3
    }
    if (skills.includes('Accurate')) {
      updates.PUN = updates.PUN + 3
    }
    ref.update(updates)
  })
}