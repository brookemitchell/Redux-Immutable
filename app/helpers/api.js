import { ref } from 'config/constants'

function saveToDucks (duck) {
  const duckId = ref.child('ducks').push().key
  const duckPromise = ref.child(`ducks/${duckId}`).set({...duck, duckId})

  return {
    duckId,
    duckPromise,
  }
}

function saveToUsersDucks (duck, duckId) {
  return ref.child(`usersDucks/${duck.uid}/${duckId}`)
    .set({...duck, duckId})
}

function saveLikeCount (duckId) {
  return ref.child(`likeCount/${duckId}`).set(0)
}

export function saveDuck (duck) {
  const { duckId, duckPromise } = saveToDucks(duck)
  return Promise.all([
    duckPromise,
    saveToUsersDucks(duck, duckId),
    saveLikeCount(duckId),
  ]).then(() => ({...duck, duckId}))
}

export function listenToFeed (cb, errCb) {
  return ref.child('ducks').on('value', (snapshot) => {
    const feed = snapshot.val() || {}
    const sortedIds = Object.keys(feed).sort((a, b) => {
      return feed[b].timestamp - feed[a].timestamp
    })
    cb({feed, sortedIds})
  }, errCb)
}

export function fetchUsersLikes (uid) {
  return ref.child(`userLikes/${uid}`).once('value')
    .then(snapshot => snapshot.val() || {})
}

export function saveToUsersLkes (uid, duckId) {
  return ref.child(`userLikes/${uid}/${duckId}`).set(true)
}

export function delteFromUsersLikes (uid, duckId) {
  return ref.child(`userLikes/${uid}/${duckId}`).set(null)
}

export function incrementNumberOfLikes (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .transaction((current = 0) => current + 1)
}

export function decrementNumberOfLikes (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .transaction((current = 0) => current - 1)
}
