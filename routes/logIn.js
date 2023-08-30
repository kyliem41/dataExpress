var express = require('express');
var router = express.Router();
var session = require('express-session');
const bcrypt = require('bcryptjs');
const {
  MongoClient,
  ObjectId
} = require('mongodb');
const uri = "mongodb://localhost:2717";

router.get('/', function (req, res, next) {
  res.render('logIn', {
    title: 'Express'
  });
})

router.post('/', async function (req, res, next) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("dataExpress");
    const collection = database.collection("users");

    const {
      username,
      password
    } = req.query;

    // const hashedPass = await bcrypt.hash(password, 10);

    // let user = {
    //   username: username,
    //   password: password
    // }

  //   collection.find({}).toArray((err, documents) => {
  //     if (err) {
  //         console.error('Error fetching documents:', err);
  //         return;
  //     }
  
  //     // Now you can iterate through the documents
  //     documents.forEach(document => {
  //         console.log(document);
  //     });
  
  //     client.close();
  // });

    const user = await collection.findOne({ username: username });

    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }

    // await collection.findOne(user);
    // res.json({
    //   success: true
    // });
  } catch (err) {
    console.log(err);
    res.json({
      success: false
    });
  } finally {
    await client.close();
  }
});


module.exports = router;

// if (req.session.views) {
//   req.session.views++
//   res.setHeader('Content-Type', 'text/html')
//   res.write('<p>views: ' + req.session.views + '</p>')
//   res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//   res.end()
// } else {
//   req.session.views = 1
//   res.end('welcome to the session demo. refresh!')
// }

// const client = new MongoClient(uri);
//     await client.connect();
//     const database = client.db("dataExpress");
//     const collection = database.collection("users");

//     const { username, password } = req.query;

//     const user = await collection.findOne({ username: username });

//     if (user && await bcrypt.compare(password, user.password)) {
//       res.json({ success: true });
//     } else {
//       res.json({ success: false });
//     }