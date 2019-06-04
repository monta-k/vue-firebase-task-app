const moment = require('moment')
const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()
const db = admin.firestore()

exports.countTasks = functions.https.onRequest(async (req, res) => {
  try {
    const created_at = Date.now()
    const date = moment().format('YYYY-MM-DD')
    const querySnapshot = await db.collection('tasks').get()
    const todo_count = querySnapshot.docs.filter(doc => doc.data().progress === "0").length
    const inprogress_count = querySnapshot.docs.filter(doc => doc.data().progress === "10").length
    const done_count = querySnapshot.docs.filter(doc => doc.data().progress === "20").length
    await db.collection('taskCount').doc(date).set({
      todo_count,
      inprogress_count,
      done_count,
      created_at
    })
    res.status(200).send({ message: 'Successfully' })
  } catch(e) {
    console.error(`error: ${e}`)
    res.status(500).send({ message: 'Failed' })
  }
})