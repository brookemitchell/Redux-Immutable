export function formatuserInfo ({displayName: name, photoURL: avatar, uid}) {
  return {name, avatar, uid,}
}

export function formatDuck (text, {name, avatar, uid } ) {

  return {
    text,
    name,
    avatar,
    uid,
    timestamp: Date.now(),
  }
}
