import firebase from 'firebase';
import User from './user';

export default {
  googleLogin(vm) {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      // ログインしたユーザーがDBに登録されているか確認
      User.findUser(result.user).then((findUser) => {
        // 登録されていなかったらユーザー登録処理
        if (findUser == null) {
          User.createUser(result.user);
        }
        vm.$router.replace({ name: 'IndexPage' });
      }).catch((error) => {
        console.error(error.message);
      });
    }).catch((error) => {
      console.error(error.message);
    });
  },

  logout(vm) {
    firebase.auth().signOut().then(() => {
      vm.$router.replace({ name: 'LoginPage' });
    });
  },
};
