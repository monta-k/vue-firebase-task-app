import firebase from 'firebase';
import User from './user';

export default {
  async googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      // ログインしたユーザーがDBに登録されているか確認
      const findUser = await User.findUser(result.user.uid);
      // 登録されていなかったらユーザー登録処理
      if (findUser == null) {
        await User.createUser(result.user);
      }
    } catch (e) {
      console.error(e);
    }
  },

  logout() {
    firebase.auth().signOut();
  },
};
