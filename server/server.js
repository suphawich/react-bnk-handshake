const express = require('express')
const firebase = require("firebase")

const app = express()
const port = process.env.PORT || 3001

const config = {
  apiKey: "AIzaSyAZ7Gyvslxm20aSsh7pVIivqCJ7-JYnA9I",
  authDomain: "react-bnk.firebaseapp.com",
  databaseURL: "https://react-bnk.firebaseio.com",
  projectId: "react-bnk",
  storageBucket: "react-bnk.appspot.com",
  messagingSenderId: "211102279711"
}
firebase.initializeApp(config)

const db = firebase.firestore()
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

app.get('/api/hello', (req, res) => {
  res.send("Hello, world")
})

const addmembers = (nickname, firstname, lastname, dob, height, province, like, bloodgroup, hobby, gen) => {
  let membersRef = db.collection('members');
  membersRef.add({
    nickname: nickname,
    firstname: firstname,
    lastname: lastname,
    dob: dob,
    height: height,
    province: province,
    like: like,
    bloodgroup: bloodgroup,
    hobby: hobby,
    gen: gen
  }).then(ref => {
    console.log('Added document with ID: ', ref.id)
  })
}

app.get('/api/addMembers', (req, res) => {
  addmembers('CAN', 'NAYIKA', 'SRINIAN', new Date('Nov 10, 1997'), 160, 'Bangkok', ['SW(CloneTrooper)', 'CD'], 'B', ["ฟังเพลง", "ดูหนัง", "เที่ยวนอกบ้าน"], 1)
  addmembers('IZURINA', 'RINA', 'IZUTA', new Date('Nov 26, 1995'), 158, 'Saitama, Japan', ['Fashion'], 'A', ["เดินห้าง"], 1)
  addmembers('JAA', 'NAPAPHAT', 'WORRAPHUTTANON', new Date('Jan 20, 2003'), 160, 'Bangkok', ['แมว', 'ผ้าเน่า', 'หมอนข้าง'], 'B', ["ฟังเพลง", 'เล่นflute', 'ดูหนัง'], 1)

  console.log('Add Members to Cloud Firestore successfully.')
  res.send('Add Members to Cloud Firestore successfully.')
})

app.listen(port, () => console.log(`Listening on port ${port}`))