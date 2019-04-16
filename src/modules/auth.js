import firebase from 'firebase';

export default {
  googleLogin(vm) {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    vm.$router.replace({ name: 'IndexPage' });
  },

  logout(vm) {
    firebase.auth().signOut().then(() => {
      vm.$router.replace({ name: 'LoginPage' });
    });
  },
};
