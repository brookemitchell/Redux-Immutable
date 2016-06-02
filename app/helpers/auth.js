export default function auth () {
  return new Promise ( (resolve, reject) => {
    setTimeout( () => {
      resolve({
        name: 'Brooke',
        avatar: 'http://123.as',
        uid: 'brookemitchell',
      })
    }, 1000)
  })
}
