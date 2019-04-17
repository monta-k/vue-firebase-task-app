import db from '../firebaseInit';

export default {
  findUser(user) {
    return new Promise((resolve, reject) => {
      let findUser = null;
      try {
        db.collection('users').where('uid', '==', user.uid).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            findUser = doc.data();
          });
          resolve(findUser);
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  allUsers(vm) {
    db.collection('users').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = {
          uid: doc.data().uid,
          name: doc.data().name,
        };
        vm.allUsers.push(data);
      });
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
