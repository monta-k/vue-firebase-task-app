import db from '../firebaseInit';

export default {
  submitTask(vm) {
    if (vm.task.id === undefined) {
      this.createTask(vm);
    } else {
      this.updateTask(vm);
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

  createTask(vm) {
    const now = Date.now();
    db.collection('tasks').add({
      name: vm.task.name,
      detail: vm.task.detail,
      priority: vm.task.priority,
      progress: vm.task.progress,
      created_at: now,
      updated_at: now,
      updated_by: vm.loginUser.uid,
      registered_user: vm.loginUser.uid,
      assigned_user: vm.task.assigned_user.uid,
    }).then(() => {
      console.log('task successfully create!');
      vm.$router.replace('/');
    })
      .catch((error) => {
        console.error('Error create task: ', error);
      });
  },

  updateTask(vm) {
    const now = Date.now();
    db.collection('tasks').doc(vm.task.id).set({
      name: vm.task.name,
      detail: vm.task.detail,
      priority: vm.task.priority,
      progress: vm.task.progress,
      created_at: vm.task.created_at,
      updated_at: now,
      updated_by: vm.loginUser.uid,
      registered_user: vm.loginUser.uid,
      assigned_user: vm.task.assigned_user.uid,
    }).then(() => {
      console.log('task successfully update!');
      vm.$router.replace('/');
    })
      .catch((error) => {
        console.error('Error update task: ', error);
      });
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
