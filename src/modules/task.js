import db from '../firebaseInit';

export default {
  async submitTask(task, loginUser) {
    if (task.id === undefined) {
      await this.createTask(task, loginUser);
    } else {
      await this.updateTask(task, loginUser);
    }
  },

  allTasks() {
    const array = [];
    db.collection('tasks').orderBy('priority', 'desc').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          name: doc.data().name,
          detail: doc.data().detail,
          priority: doc.data().priority,
          progress: doc.data().progress,
          created_at: doc.data().created_at,
          updated_at: doc.data().updated_at,
          updated_by: doc.data().updated_by,
          registered_user: null,
          assigned_user: null,
        };
        db.doc(`users/${doc.data().registered_user}`).get().then((result) => { data.registered_user = result.data(); });
        db.doc(`users/${doc.data().assigned_user}`).get().then((result) => { data.assigned_user = result.data(); });
        array.push(data);
      });
    });
    return array;
  },

  async createTask(task, loginUser) {
    const now = Date.now();
    await db.collection('tasks').add({
      name: task.name,
      detail: task.detail,
      priority: task.priority,
      progress: task.progress,
      created_at: now,
      updated_at: now,
      updated_by: loginUser.uid,
      registered_user: loginUser.uid,
      assigned_user: task.assigned_user.uid,
    });
  },

  async updateTask(task, loginUser) {
    const now = Date.now();
    await db.collection('tasks').doc(task.id).set({
      name: task.name,
      detail: task.detail,
      priority: task.priority,
      progress: task.progress,
      created_at: task.created_at,
      updated_at: now,
      updated_by: loginUser.uid,
      registered_user: loginUser.uid,
      assigned_user: task.assigned_user.uid,
    });
  },

  async deleteTask(taskId) {
    const doc = await db.collection('tasks').doc(taskId).get();
    if (doc.exists) {
      doc.ref.delete();
    }
  },
};
