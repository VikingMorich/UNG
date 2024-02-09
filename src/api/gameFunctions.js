import fire from '../fire'
import Cookies from 'universal-cookie';

let cookies = new Cookies();

export function changeUserName(name) {
  let ref = fire.database().ref().child('Players')
  let key = cookies.get('key')
  let updates = {}
  updates[key] = {
    username: name,
  }
  ref.update(updates)
}

export function setUserCharacterType(type) {
  let ref = fire.database().ref().child('Players')
  let key = cookies.get('key')
  let updates = {}
  updates[key] = {
    characterType: type,
  }
  ref.update(updates)
}

export function addPlayerDB(name, email, imageUrl) {
  let timeExpiration = new Date(Date.now() + (1000 * 3600 * 8))
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
  ref.update(updates)
}