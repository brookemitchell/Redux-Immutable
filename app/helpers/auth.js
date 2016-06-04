export default function auth () {
  return new Promise ( (resolve, reject) => {
    setTimeout( () => {
      resolve({
        name: 'Brooke',
        avatar: 'http://123.as',
        uid: 'brookemitchell',
      })
      /* reject('fuuuuuu')*/
    }, 1000)
  })
}

export function checkIfAuthed (store) {
  //Ignore firebase
  return store.getState().isAuthed
}

export function logout( ) {
  console.log('Logged out')
}
