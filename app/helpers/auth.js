import { ref } from 'config/constants'
import firebase from 'firebase'
import { formatuserInfo } from 'helpers/utils'
import { authUser, fetchingUserSuccess } from 'redux/modules/users'

export default function auth () {
  const provider = new firebase.auth.FacebookAuthProvider();

  return firebase.auth().signInWithPopup(provider)
}

export function checkIfAuthed (store) {
  //Ignore firebase
  const authData = firebase.auth().currentUser
  if ( authData === null) {
    return false
  }
  else if(store.getState().isAuthed === false) {
    const {uid} = authData
    const userInfo = formatuserInfo(authData)
    store.dispatch(authUser(uid))
    store.dispatch(fetchingUserSuccess(uid, userInfo, Date.now()))
  }
  return true
}

export function logout( ) {
  return firebase.auth().signOut()
}

export function saveUser (user) {
  return ref.database().ref(`users/${user.uid}`)
    .set(user)
    .then(() => user)
}
