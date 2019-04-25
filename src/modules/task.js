import db from '../firebaseInit';
import User from './user';

export default {
  async submitTask(task, loginUser) {
    if (task.id === undefined) {
      await this.createTask(task, loginUser);
    } else {
      await this.updateTask(task, loginUser);
    }
  },

  async allTasks() {
    const querySnapshot = await db.collection('tasks').orderBy('priority', 'desc').get();
    return Promise.all(querySnapshot.docs.map(async doc => (
      {
        ...doc.data(),
        id: doc.id,
        registered_user: await User.findUser(doc.data().registered_user),
        assigned_user: await User.findUser(doc.data().assigned_user) || { name: '', photo: '', uid: '' },
        comments: await this.fetchComments(doc.id),
      })));
  },

  async createTask(task, loginUser) {
    const now = Date.now();
    await db.collection('tasks').add({
      ...task,
      created_at: now,
      updated_at: now,
      updated_by: loginUser.uid,
      registered_user: loginUser.uid,
      assigned_user: task.assigned_user.uid,
      comments: [],
    });
  },

  async updateTask(task, loginUser) {
    const now = Date.now();
    await db.collection('tasks').doc(task.id).update({
      ...task,
      updated_at: now,
      updated_by: loginUser.uid,
      registered_user: task.registered_user.uid,
      assigned_user: task.assigned_user.uid,
    });
  },

  async deleteTask(taskId) {
    const doc = await db.collection('tasks').doc(taskId).get();
    if (doc.exists) {
      doc.ref.delete();
    }
  },

  updateProgress(task, progress) {
    db.collection('tasks').doc(task.id).update({ progress });
  },

  async fetchComments(taskId) {
    const querySnapshot = await db.collection('tasks').doc(taskId).collection('comments').orderBy('created_at', 'desc').get();
    return Promise.all(querySnapshot.docs.map(async doc => (
      {
        ...doc.data(),
        id: doc.id,
        user: await User.findUser(doc.data().user),
      })));
  },

  async createComment(task, comment) {
    const now = Date.now();
    return await db.collection('tasks').doc(task.id).collection('comments').add({
      ...comment,
      created_at: now,
    });
  },
};
