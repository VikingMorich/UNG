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