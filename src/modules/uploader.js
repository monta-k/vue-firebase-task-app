import { db, storage } from '../firebaseInit';

export default {
  async fileUpload(taskId, file) {
    const storageRef = storage.ref().child(`${taskId}/${file.name}`);
    await storageRef.put(file);
    const now = Date.now();
    await db.collection('tasks').doc(taskId).collection('files').add({
      path: await storageRef.getDownloadURL(),
      name: file.name,
      created_at: now,
    });
  },

  async fetchFiles(taskId) {
    const querySnapshot = await db.collection('tasks').doc(taskId).collection('files').get();
    return querySnapshot.docs.map(doc => (
      {
        ...doc.data(),
        id: doc.id,
      }));
  },
};
