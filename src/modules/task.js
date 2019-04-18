import db from '../firebaseInit';

export default {
  submitTask(vm) {
    const now = Date.now();
    db.collection('tasks').add({
      name: vm.task.name,
      detail: vm.task.detail,
      priority: vm.task.priority,
      progress: '0',
      created_at: now,
      updated_at: now,
      updated_by: vm.loginUser.uid,
      registered_user: vm.loginUser.uid,
      assigned_user: vm.task.assigned_user,
    }).then(() => {
      console.log('task successfully create!');
      vm.$router.replace('/');
    }).catch((error) => {
      console.error('Error create task: ', error);
    });
  },

  allTasks() {
    const array = [];
    db.collection('tasks').get().then((querySnapshot) => {
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

  deleteTask(taskId) {
    return new Promise((resolve, reject) => {
      try {
        db.collection('tasks').doc(taskId).get().then((doc) => {
          if (doc.exists) {
            if (window.confirm('Are you sure?')) {
              doc.ref.delete();
              resolve();
            }
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};
