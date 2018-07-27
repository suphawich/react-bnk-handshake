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

app.get('/api/getGen/:gen', (req, res) => {
  let gen = parseInt(req.params.gen)
  console.log(typeof gen, "gen: "+ gen)
  if (isNaN(gen)) {
    res.send('Error, parameter not number.')
    return
  }
  
  const send = (data) => {res.send(data)}
  getGen(gen, send)

  console.log('Get Members gen '+ gen +' from Cloud Firestore successfully.')
  // res.send('Get Members gen '+ gen +' from Cloud Firestore successfully.')
  // res.send(a)
})

const getGen = (gen, callback) => {
  let membersRef = db.collection('members')
  let memGenOne = membersRef.where('gen', '==', gen)
  let memOrderBy = memGenOne.orderBy('nickname')
  
  memOrderBy.get().then(snapshot => {
    let data = []
    snapshot.forEach(doc => {
      // console.log(doc.id, '=>', doc.data().nickname)
      data.push(doc.data())
    })
    callback(data)
  })
  .catch(err => {
    console.log('Error getting documents', err);
  })
}

app.get('/api/addMembers', (req, res) => {

  //let noti = genOne()
  // let noti = genTwo()
  
  // console.log(noti)
  // res.send(noti)
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
    console.log('Added document with ID: ' + ref.id + ", member: " + nickname)
  })
}

const genOne = () => {
  // addmembers('CHERPRANG', 'CHERPRANG', 'AREEKUL', new Date('May 2, 1996'), 160, 'Bangkok', [], 'B', ["กิน", "นอน", "เล่นเกม", "ฟังเพลง", "Cosplay"], 1)
  addmembers('CAN', 'NAYIKA', 'SRINIAN', new Date('Nov 10, 1997'), 160, 'Bangkok', ['SW(CloneTrooper)', 'CD'], 'B', ["ฟังเพลง", "ดูหนัง", "เที่ยวนอกบ้าน"], 1)
  addmembers('IZURINA', 'RINA', 'IZUTA', new Date('Nov 26, 1995'), 158, 'Saitama, Japan', ['Fashion'], 'A', ["เดินห้าง"], 1)
  addmembers('JAA', 'NAPAPHAT', 'WORRAPHUTTANON', new Date('Jan 20, 2003'), 160, 'Bangkok', ['แมว', 'ผ้าเน่า', 'หมอนข้าง'], 'B', ["ฟังเพลง", 'เล่นflute', 'ดูหนัง'], 1)
  addmembers('JANE', 'KUNJIRANUT', 'INTARASIN', new Date('Mar 23, 2000'), 159, 'Pathum Thani', ['บาร์บี้', 'หมา', 'แมว', 'แฮมสเตอร์', 'กระต่าย'], 'A', ["นอน", "กิน", "ดูอนิเมะ"], 1)
  addmembers('JENNIS', 'JENNIS', 'OPRASERT', new Date('Jul 4, 2000'), 161, 'Petchaburi', ['Kpop101', 'สะสมโมเดลอาวุธ', 'เครื่องสำอาง'], 'O', ["เล่นกีฬา", "ดูหนัง", "ฟังเพลง", "ดูอนิเมะ"], 1)
  addmembers('JIB', 'SUCHAYA', 'SAENKHOT', new Date('Jul 4, 2002'), 159, 'Lopburi', ['anime', 'guchi'], 'A', ["เล่นเกม", "วาดรูป", "ดูอนิเมะ", "ฟังเพลง"], 1)
  addmembers('KAEW', 'NATRUJA', 'CHUTIWANSOPON', new Date('Mar 31, 1994'), 156, 'Chonburi', ['เครื่องสำอาง', 'น้ำหอม'], 'B', ["เล่นเปียโน", "นอน", "เดินเล่น", "ฟังเพลง"], 1)
  addmembers('KAIMOOK', 'WARATTAYA', 'DEESOMLERT', new Date('Aug 27, 1997'), 153, 'Bangkok', ['แมว'], 'O', ["เข้าครัว", "เย็บผ้า"], 1)
  addmembers('KATE', 'KORAPAT', 'NILPRAPA', new Date('Jun 9, 2001'), 162, 'Phayao', ['gudetama', 'ตุ๊กตา'], 'B', ["ชิว"], 1)
  addmembers('KORN', 'VATHUSIRI', 'PHUWAPUNYASIRI', new Date('Jan 21, 1999'), 163, 'Bangkok', ['Kitty'], 'O', ["ดูหนังผี", "อ่านหนังสือผี"], 1)
  addmembers('MAYSA', 'MESA', 'CHINAVICHARANA', new Date('Apr 8, 1999'), 162, 'Bangkok', ['Sanrio', 'เครื่องสำอาง'], 'A', ["ถ่ายรูป"], 1)
  addmembers('MIND', 'PANISA', 'SRILALOENG', new Date('Sep 6, 2001'), 165, 'Nakhon Ratchasima', ['กระต่าย'], 'B', ["ฟังเพลงญี่ปุ่น(scandal)"], 1)
  addmembers('MIORI', 'MIORI', 'OHKUBO', new Date('Sep 30, 1998'), 153, 'Ibaraki, Japan', ['Sanrio', 'Disney', 'Morning', 'Musume'], 'O', ["ร้องเพลง"], 1)
  addmembers('MOBILE', 'PIMRAPAT', 'PHADUNGWATANACHOK', new Date('Jul 9, 2002'), 159, 'Bangkok', ['มูมิน', 'อนิเมะ', 'แต่งหน้า'], 'O', ["Cosplay"], 1)
  addmembers('MUSIC', 'PRAEWA', 'SUTHAMPHONG', new Date('Feb 24, 2001'), 158, 'Bangkok', ['อะไรก็ได้นิ่มๆ'], 'B', ["Cosplay", "Game"], 1)
  addmembers('NAMNEUNG', 'MILIN', 'DOKTHIAN', new Date('Nov 11, 1996'), 160, 'Sing Buri', ['เสื้อผ้า', 'เครื่องสำอาง', 'หนังสือการ์ตูน', 'นิยาย'], 'B', ["นอน", "อ่านนิยาย", "ฟังเพลง"], 1)
  addmembers('NAMSAI', 'PICHAYAPA', 'NATHA', new Date('Oct 26, 1999'), 170, 'Chiang Mai', ['อัลปาก้า', 'อวกาศ', 'กีฬาที่เป็นลูกบอล'], 'O', ["กิน"], 1)
  addmembers('NINK', 'MANANYA', 'KAOJU', new Date('Feb 3, 2000'), 163, 'Samut Sakorn', ['Suchi'], 'O', ["วาดรูป", "ดูอนิเมะ"], 1)
  addmembers('NOEY', 'KANTEERA', 'WADCHARATHADSANAKUL', new Date('Apr 9, 1997'), 163, 'Samut Prakan', ['เครื่องสำอาง', 'นาฬิกาข้อมือ', 'กระเป๋า'], 'AB', ["นอน"], 1)
  addmembers('ORN', 'PATCHANAN', 'JIAJIRACHOTE', new Date('Feb 3, 1997'), 164, 'Bangkok', ['แมว', 'แมวน้ำ', 'แฟชั่น', 'เครื่องสำอาง'], 'O', ["นอน", "อ่านหนังสือ", "เล่นกับแมว"], 1)
  addmembers('PIAM', 'RINRADA', 'INTHAISONG', new Date('Jun 4, 2003'), 159, 'Saraburi', ['corgy', 'gundam figure'], 'B', ["นอน", "กิน", "เล่นเกม"], 1)
  addmembers('PUN', 'PUNSIKORN', 'TIYAKORN', new Date('Nov 9, 2000'), 166, 'Bangkok', ['Fashion'], 'A', ["ฟังเพลง", "เล่นมือถือ"], 1)
  addmembers('PUPE', 'JIRADAPA', 'INTAJAK', new Date('Jan 18, 1998'), 160, 'Chiang Rai', ['ผ้มห่ม', 'สีชมพู', 'โดเรม่อน'], 'B', ["เล่นเกม", "ดูอนิเมะ", "ฟังเพลง", "นอน"], 1)
  addmembers('SATCHAN', 'SAWITCHAYA', 'KAJONRUNGSILP', new Date('Dec 13, 2003'), 150, 'Bangkok', ['my melody'], 'A', ["ฟังเพลง"], 1)
  addmembers('TARWAAN', 'ISARAPA', 'THAWATPAKDEE', new Date('Dec 18, 1996'), 156, 'Nakhon Pathom', [], 'O', ["ดูหนัง", "ฟังเพลง"], 1)

  return 'Add Members GEN 1 to Cloud Firestore successfully.'
}

const genTwo = () => {
  addmembers('AOM', 'PUNYAWEE', 'JUNGCHAROEN', new Date('Sep 20, 1995'), 157, 'Chiang Mai', ['คิตตี้', 'บิงซู'], 'B', ["ดูหนัง", "อ่านหนังสือ"], 2)
  addmembers('BAMBOO', 'JANISTA', 'TANSIRI', new Date('Sep 3, 2002'), 167, 'Samut Prakan', ['สุนัข', 'สีเหลือง', 'ขนมเฮลตี้', 'ต่างหู'], 'O', ["เล่นบาสเกตบอล", "วาดรูป", "ดูรายการตลก", "เต้นโคฟเวอร์", "ทำขนม"], 2)
  addmembers('CAKE', 'NAWAPORN', 'CHANSUK', new Date('Nov 18, 1996'), 162, 'Bangkok', ['มินเนี่ยน', 'กินไอติม', 'บิงซู', 'ดูหนังสืบสวน'], 'O', ["ร้องเพลง", "ดูหนัง", "เล่นบาสเกตบอล"], 2)
  addmembers('DEENEE', 'PIMNIPA', 'TUNGSAKUL', new Date('Nov 28, 2001'), 172, 'Bangkok', ['ขนมเค้ก', 'ออกเเบบบ้าน'], 'O', ["วาดรูป", "ร้องเพลง"], 2)
  addmembers('FAII', 'SUMITRA', 'DUANGKAEW', new Date('Jun 28, 1996'), 165, 'Lamphun', ['แมว', 'นารุโตะ'], 'B', ["ฟังเพลง", "ดูคลิปแมว"], 2)
  addmembers('FIFA', 'PAWEETHIDA', 'SAKUNPIPHAT', new Date('Nov 6, 2001'), 163, 'Bangkok', ['โดราเอม่อน', 'นิยาย', 'สีฟ้า', 'สีม่วง', 'สีชมพู'], 'B', ["อ่านหนังสือการ์ตูน", "ดูอนิเมะ", "ฟังเพลง", "เล่นเกม"], 2)
  addmembers('FOND', 'NATTICHA', 'CHANTARAVAREELEKHA', new Date('Dec 3, 2002'), 158, 'Prachuap Khiri Khan', ['อาหารเผ็ดๆ', 'เครื่องเขียนโทนพาสเทล', 'สุนัขพันธุ์คอร์กี้', 'หนังผี'], 'A', ["ร้องเพลง", "เต้น", "พากย์การ์ตูน", "ดูหนัง"], 2)
  addmembers('GYGEE', 'NUTTAKUL', 'PIMTONGCHAIKUL', new Date('Oct 4, 2001'), 162, 'Bangkok', ['ตุ๊กตายูนิคอร์น', 'แมวจี้'], 'O', ["อ่านการ์ตูน", "ดูซีรี่ย์", "แบดมินตัน", "ร้องเพลง"], 2)
  addmembers('JUNÉ', 'PLEARNPICHAYA', 'KOMALARAJUN', new Date('Jul 4, 2000'), 171, 'Bangkok', ['เฉาก๊วยนมสด', 'คอร์กี้'], 'A', ["วาดรูป", "ถ่ายรูป", "ฟังเพลง"], 2)
  addmembers('KHAMIN', 'MANIPA', 'ROOPANYA', new Date('Apr 23, 1999'), 158, 'Khon Kaen', ['สุนัข'], 'O', ["ฟังเพลง", "อ่านหนังสือ"], 2)
  addmembers('KHENG', 'JUTHAMAS', 'KHONTA', new Date('Mar 26, 2000'), 161, 'Samut Prakan', ['เพลงฮิปฮอป', 'เเรพเปอร์'], '-', ["ฟังเพลง"], 2)
  addmembers('MAIRA', 'MAIRA', 'KUYAMA', new Date('Feb 24, 1997'), 153, 'Bangkok', ['ของเล่น'], 'A', ["ระบายสี"], 2)
  addmembers('MEWNICH', 'NANNAPHAS', 'LOETNAMCHOETSAKUN', new Date('Mar 11, 2002'), 158, 'Samut Prakan', ['มิกกี้เมาส์', 'ตุ๊กตาเอเลี่ยนสามตา', 'เจ้าหญิง'], 'B', ["ทำอาหาร", "ขนม", "ดูซีรีย์"], 2)
  addmembers('MINMIN', 'RACHAYA', 'TUPKUNANON', new Date('Mar 20, 1997'), 161, 'Bangkok', ['ส้มตำปูปลาร้า'], 'B', ["ดูหนัง", "ฟังเพลง", "เล่นเกม"], 2)
  addmembers('MYYU', 'KHAWISARA', 'SINGPLOD', new Date('Oct 28, 1999'), 167, 'Bangkok', ['กินไก่ทอด', 'ของหวานทุกประเภท'], 'O', ["แกะท่าเต้นจากยูทูป", "ดูคลิปเต้น", "ดูคลิปทำอหาร"], 2)
  addmembers('NATHERINE', 'DUSITA', 'KITISARAKULCHAI', new Date('Nov 11, 1999'), 163, 'Bangkok', ['เค้กส้ม', 'บัวลอย', 'คิตตี้'], 'O', ["เล่นเกม", "ดูบอล"], 2)
  addmembers('NEW', 'CHANYAPUK', 'NUMPRASOP', new Date('Jan 2, 2003'), 157, 'Bangkok', ['สุนัข'], 'B', ["ฟังเพลง", "เล่นกีตาร์", "เล่นเปียโน"], 2)
  addmembers('NIKY', 'WARINRAT', 'YOLPRASONG', new Date('Jan 26, 2005'), 159, 'Chiang Mai', ['ต่างหู', 'สีbabypink', 'มะขามเทศ'], 'O', ["ฟังเพลง", "ออกกำลังกาย"], 2)
  addmembers('NINE', 'PHATTHARANARIN', 'MUEANARIT', new Date('Nov 11, 2000'), 162, 'Nakhon Sawan', ['หมีคุมะ'], 'B', ["เล่นกีตาร์", "อ่านหนังสือการ์ตูน"], 2)
  addmembers('OOM', 'NATCHA', 'KRISDHASIMA', new Date('Sep 29, 2002'), 163, 'Bangkok', ['ไอศครีม'], 'O', ["อ่านหนังสือ", "ทำสวน"], 2)
  addmembers('PAKWAN', 'PAKWAN', 'NOIJAIBOON', new Date('Feb 18, 2000'), 160, 'Sakon Nakhon', ['สัตว์น่ารักยกเว้นสัตว์เลื้อยคลานทุกประเภท', 'ไอศครีม', 'สีชมพู ', 'ถ่ายรูป', 'ตุ๊กตา', 'แต่งตัว', 'ชอบสงสัย'], 'B', ["ร้อง/ฟัง/แต่งเพลง", "เล่นดนตรี(ไวโอลีน ขิม อูคู กีต้าร์ คีย์บอร์ด ปล.เล่นไม่เก่งแต่เล่นหมดนะคะ555)", "เล่นกีฬา(บาส โยคะ มวย พาน้องหมาไปวิ่ง)", "จัดบ้าน", "เก็บของทำความสะอาด", "วาดรูป", "ทำสวนเพราะชอบปลูกผัก แต่ชอบเลี้ยงกระบองเพชรเป็นกรณียกเว้น"], 2)
  addmembers('PANDA', 'JIDARPHA', 'CHAMCHOOY', new Date('Oct 10, 1997'), 159, 'Nakhon Pathom', ['ร้องเพลง', 'ช็อกโกแลต', 'หนูDumbo ', 'Rat'], 'A', ["อ่านการ์ตูน", "ดูหนัง", "วาดรูป"], 2)
  addmembers('PHUKKHOM', 'SIRIKARN', 'SHINNAWATSUWAN', new Date('Feb 28, 1998'), 165, 'Samut Prakan', ['ตุ๊กตาญี่ปุ่น', 'เรื่องผี', 'เจ้าหญิง'], 'B', ["วาดรูป", "ดูหนัง", "ร้องเพลง", "D.I.Y."], 2)
  addmembers('RATAH', 'RATAH', 'CHINKRAJANGKIT', new Date('Mar 27, 2002'), 156, 'Chiang Mai', ['สีเหลือง', 'เเมว', 'อาหารที่กินได้'], 'A', ["เเต่งนิยาย", "เต้นcover"], 2)
  addmembers('STANG', 'TARISA', 'PREECHATANGKIT', new Date('Oct 22, 2003'), 164, 'Bangkok', ['ไข่เจียว'], 'O', ["เล่นกีตาร์"], 2)
  addmembers('VIEW', 'KAMONTHIDA', 'ROTTHAWINITHI', new Date('May 28, 2004'), 165, 'Nonthaburi', ['ก๋วยเตี๋ยวต้มยำ'], 'B', ["อ่านการ์ตูน", "ฟังเพลง"], 2)
  addmembers('WEE', 'WEERAYA', 'ZHANG', new Date('Oct 23, 2001'), 167, 'Chonburi', ['สลัด', 'ชอบกินผัก', 'แต่ไม่ชอบขึ้นฉ่าย'], 'O', ["ดูหนัง", "ว่ายน้ำ", "เล่นเกม"], 2)

  return 'Add Members GEN 2 to Cloud Firestore successfully.'
}

app.listen(port, () => console.log(`Listening on port ${port}`))