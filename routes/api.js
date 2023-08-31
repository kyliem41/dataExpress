var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:2717';

router.get('/', async function(req, res, next) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("dataExpress");
    const collection = database.collection("users");

    const stats = [
      {
        question: "Favorite Cookies",
        options: ["Chips Ahoy", "Oreo", "Oatmeal Raisin", "Macadamia Nut"],
        votes: [0, 0, 0, 0]
      },
      {
        question: "Favorite Color",
        options: ["Red", "Green", "Blue", "Purple"],
        votes: [0, 0, 0, 0]
      },
      {
        question: "Favorite Programming Language",
        options: ["Java", "JavaScript", "Python", "C++"],
        votes: [0, 0, 0, 0]
      }
    ]

    const users = await collection.find({}).toArray();
    users.forEach(user => {
      stats[0].votes[stats[0].options.indexOf(user.answer1)]++;
      stats[1].votes[stats[1].options.indexOf(user.answer2)]++;
      stats[2].votes[stats[2].options.indexOf(user.answer3)]++;
    });
    res.json(stats);
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  } finally {
    await client.close();
  }
});

router.post('/', function(req, res) { // sign up
    
})

module.exports = router;