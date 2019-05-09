import { db } from '../firebaseInit';

export default {
  async findUser(userId) {
    const querySnapshot = await db.collection('users').where('uid', '==', userId).get();
    return (querySnapshot.docs.length === 0) ? null : querySnapshot.docs[0].data();
  },

  async allUsers() {
    const querySnapshot = await db.collection('users').get();
    return querySnapshot.docs.map(doc => (
      {
        ...doc.data(),
      }));
  },

  async createUser(user) {
    try {
      const data = {
        uid: user.uid,
        name: user.displayName,
        photo: user.photoURL,
        admin: false,
        available: false,
      };
      await db.collection('users').doc(user.uid).set({
        ...data,
      });
      console.log('user successfully create!');
      return data;
    } catch (e) {
      console.error('Error create user: ', e);
    }
  },

  async deleteUser(user) {
    const doc = await db.collection('users').doc(user).get();
    if (doc.exists) {
      doc.ref.delete();
    }
  },

  async registerUser(user) {
    await db.collection('users').doc(user).update({
      available: true,
    });
  },
};
