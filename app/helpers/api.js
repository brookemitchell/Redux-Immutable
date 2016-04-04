import { ref } from 'config/constants'

function saveToDucks (duck) {
  const duckId = ref.child('ducks').push().key()
  const duckPromise = ref.child(`ducks/${duckId}`).set({...duck, duckId})
  return {
    duckId,
    duckPromise
  }
}

function saveToUsersDucks (duck, duckId) {
  const endpoint = `usersDucks/${duck.uid}/${duckId}`
  return ref.child(endpoint).set({...duck, duckId})
}

function saveLikeCount (duckId) {
  return ref.child(`likeCount/${duckId}`).set(0)
}

export function saveDuck (duck) {
  const { duckId, duckPromise } = saveToDucks(duck)

  return Promise.all([
    duckPromise,
    saveToUsersDucks(duck, duckId),
    saveLikeCount(duckId)
  ]).then(() => ({...duck, duckId}))
}

export function listenToFeed (cb, errorCB) {
  return ref.child('ducks').on('value', (snapshot) => {
    cb(snapshot.val())
  }, errorCB)
}

export function removeFirebaseListener (cb) {
  ref.off('value', cb)
}

export function fetchUsersLikes (uid) {
  return ref.child(`usersLikes/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function saveToUsersLikes (uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(true)
}

export function deleteFromUsersLikes (uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(null)
}

export function fetchLikeCount (duckId) {
  return ref.child(`likeCount/${duckId}`).once('value')
    .then((snapshot) => snapshot.val() || 0)
}

export function incrementNumberOfLikes (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .transaction((currentValue = 0) => currentValue + 1)
}

export function decrementNumberOfLikes (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .transaction((currentValue = 0) => currentValue - 1)
}

export function fetchDuck (duckId) {
  return ref.child(`ducks/${duckId}`).once('value')
    .then((snapshot) => snapshot.val())
}

export function postReply (duckId, reply) {
  const replyId = ref.child(`replies/${duckId}`).push().key()
  const replyWithId = {...reply, replyId}
  const replyPromise = ref.child(`replies/${duckId}/${replyId}`).set(replyWithId)

  return {
    replyWithId,
    replyPromise,
  }
}

export function fetchReplies (duckId) {
  return ref.child(`replies/${duckId}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchUsersDucks (uid) {
  return ref.child(`usersDucks/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchUser (uid) {
  return ref.child(`users/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}