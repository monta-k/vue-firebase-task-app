import db from '../firebaseInit';

export default {
  findTask(taskId) {
    db.collection('tasks').doc(taskId).get().then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  },

  submitTask(taskId) {

  },

  allTasks(vm) {
    db.collection('tasks').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = {
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
        db.doc('users/' + doc.data().registered_user).get().then((result) => { data.registered_user = result.data() });
        db.doc('users/' + doc.data().assigned_user).get().then((result) => { data.assigned_user = result.data() });
        vm.allTasks.push(data);
      });
    });
  },
};
