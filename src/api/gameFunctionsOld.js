import fire from '../fire'
import Cookies from 'universal-cookie';
import { itemsList } from './gameDatabase';

let cookies = new Cookies();
let timeExpiration = new Date(Date.now() + (1000 * 3600 * 24))

export function changeUserNameOld(name) {
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

export function buyObjOld(obj, numberItems) {
  let objInfo = Object.keys(itemsList).map(el => {
      return itemsList[el].map(ele => ele)
  }).flat(1).find(el => el.name === obj)
  let ref = fire.database().ref().child('Players')
  let key = cookies.get('key')
  ref.child(key).once("value", function(playersStateSnap) {
    let updates = playersStateSnap.val()
    updates.gameStates.gold -= (objInfo.gold * numberItems)
    let exist = updates.gameStates.backpack && Object.keys(updates.gameStates.backpack).find(el => updates.gameStates.backpack[el].name === objInfo.name)
    if (exist) {
      updates.gameStates.backpack[exist].count += numberItems
    } else {
      let Objkey = ref.push().key
      let hasBackpack = updates.gameStates.backpack ? true : false
      if (!hasBackpack)
        updates.gameStates.backpack = {
          [Objkey] : {
            name: objInfo.name,
            count: numberItems || objInfo.count,
            type: objInfo.type,
            objType: objInfo.objType || null,
            stateUsed: objInfo.stateUsed || null,
            stats: objInfo.stats || null,
            description: objInfo.description || null,
            imgSrc: objInfo.imgSrc || null,
            sellPrice: objInfo.gold || null,
            equiped: false
          }
        }
      else {
        updates.gameStates.backpack[Objkey] = {
          name: objInfo.name,
          count: numberItems || objInfo.count,
          type: objInfo.type,
          objType: objInfo.objType || null,
          description: objInfo.description || null,
          stateUsed: objInfo.stateUsed || null,
          stats: objInfo.stats || null,
          imgSrc: objInfo.imgSrc || null,
          sellPrice: objInfo.gold || null,
          equiped: false
        }
      }
    }
    ref.child(key).update(updates)
  })//.then(() => { window.location.reload() })
}

export function setUserCharacterTypeOld(type) {
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
      history: 'page0',
      companion: 'undefined'
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

export function removeLastBattleAttak() {
  let key = cookies.get('key')
  let ref = fire.database().ref().child('Players/' + key + '/gameStates')
  ref.once("value", function(snap) {
    let updates = snap.val()
    updates.battle.lastEnemyDmg = null
    updates.battle.lastPlayerDmg = null
    ref.update(updates).then(() => window.location = '/game')
    
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
      updates.gameStates.maxEXP = updates.gameStates.maxEXP + 150
    }
    updates.gameStates.EXP = currentEXP
    updates.gameStates.LVL = currentLVL
    updates.gameStates.ATK = currentAtk
    updates.gameStates.skillPoints = currentSkillPoints
    
    ref.child(key).update(updates)
  })
}

export function saveBattleRewardOld(reward) {
  let key = cookies.get('key')
  let ref = fire.database().ref().child('Players/' + key + '/gameStates')
  ref.once("value", function(snap) {
    let updates = snap.val()
    reward.forEach(el => {
      if(el.type === 'coins') {
        let plusGain = 0
        if (updates.learnedSkills && updates.learnedSkills.includes('Greedy')) {
          plusGain = parseInt(el.count * 5 / 100)
        }
        updates.gold = updates.gold + el.count + plusGain
      }
      if(el.type === 'EXP') {
        let currentEXP = updates.EXP + el.count
        //LVL UP
        if(currentEXP >= updates.maxEXP) {
          updates.LVL = updates.LVL + 1
          currentEXP -= updates.maxEXP
          updates.ATK += 1
          updates.maxEXP = updates.maxEXP + 150
          updates.skillPoints = (updates.skillPoints || 0) + 1
          if(currentEXP >= updates.maxEXP) {
            updates.LVL = updates.LVL + 1
            currentEXP -= updates.maxEXP
            updates.ATK += 1
            updates.maxEXP = updates.maxEXP + 150
            updates.skillPoints = (updates.skillPoints || 0) + 1
          }
        }
        updates.EXP = currentEXP
        updates.battle.lastEnemyDmg = null
        updates.battle.lastPlayerDmg = null
      }
    })
    updates.battle.endBattle = true
    ref.update(updates).then(() => window.location = '/game')
    
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