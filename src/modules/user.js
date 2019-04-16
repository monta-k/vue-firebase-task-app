import db from '../firebaseInit';

export default {
  findUser(user) {
    return new Promise((resolve, reject) => {
      let find_user = null;
      try {
        db.collection('users').where('uid', '==', user.uid).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            find_user = doc.data();
          });
          resolve(find_user);
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  createUser(user) {
    db.collection('users').add({
      uid: user.uid,
      name: user.displayName,
      photo: user.photoURL,
    }).then(() => {
      console.log('user successfully create!');
    }).catch((error) => {
      console.error('Error create user: ', error);
    });
  },
};
