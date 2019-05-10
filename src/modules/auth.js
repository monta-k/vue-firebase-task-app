import firebase from 'firebase'

export default {
  async googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    try {
      await firebase.auth().signInWithPopup(provider)
    } catch (e) {
      console.error(e)
    }
  },

  logout() {
    firebase.auth().signOut()
  },
}
