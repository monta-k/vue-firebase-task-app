import db from '../firebaseInit';

export default {
  async findUser(userId) {
    const querySnapshot = await db.collection('users').where('uid', '==', userId).get();
    return (querySnapshot.docs.length === 0) ? null : querySnapshot.docs[0].data();
  },

  async allUsers() {
    const querySnapshot = await db.collection('users').get()
    return querySnapshot.docs.map((doc) => {
      return {
        uid: doc.data().uid,
        name: doc.data().name,
      };
    });
  },

  createUser(user) {
    db.collection('users').doc(user.uid).set({
      uid: user.uid,
      name: user.displayName,
      photo: user.photoURL,
    }).then(() => {
      console.log('user successfully create!');
    })
      .catch((error) => {
        console.error('Error create user: ', error);
      });
  },
};
