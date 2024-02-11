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
    updates['characterType'] = type
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