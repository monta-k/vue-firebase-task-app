import { db } from '../firebaseInit'

export default {
  async allTaskCount() {
    const querySnapshot = await db.collection('taskCount').orderBy('created_at', 'asc').get()
    return querySnapshot.docs.map(doc => (
      {
        ...doc.data(),
        id: doc.id,
      }))
  },
}
