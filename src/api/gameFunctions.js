import fire from '../fire'
import Cookies from 'universal-cookie';

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
    let harcodedObjects = [{name: '* Wood *', type: 'none', count: 20, equiped: false}]
    harcodedObjects.forEach(el => {
      let objkey = ref.push().key
      updates.gameStates.backpack[objkey] = {
        name: el.name,
        count: el.count,
        type: el.type,
        equiped: el.equiped
      }
    })
    

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
    let exist = Object.keys(updates.gameStates.backpack).find(el => updates.gameStates.backpack[el].name === obj.name)
    if (exist) {
      updates.gameStates.backpack[exist].count += 1
    } else {
      let Objkey = ref.push().key
      updates.gameStates.backpack[Objkey] = {
        name: obj.name,
        count: obj.count,
        type: obj.type,
        objType: obj.objType || null,
        stats: obj.stats || null,
        equiped: false
      }
    }
    ref.child(key).update(updates)
  }).then(() => {
    window.location = '/game'
  })
}