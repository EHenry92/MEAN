const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const dbName = 'mean';

//Connect
const connection = closure => {
  return MongoClient.connect(`mongodb://localhost:27017/${dbName}`, (err, database) => {
    if (err) return console.log(err);
    closure(database.db(dbName));
  });
};


//Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

//Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

//Get users
router.get('/users', (req, res) => {
  connection(db => {
    db.collection('users')
      .find()
      .toArray()
      .then(users => {
        response.data = users;
        res.json(response);
      })
      .catch(err => {
        sendError(err, res);
      });
  });
});

router.post('/users', (req, res) => {
  connection(db => {
    db.collection('users')
    .insert(req.body)
    .then(newUser => {
      res.status(200).send('ok').end();
    })
    .catch(err => {
      sendError(err, res);
    });
  });
});

router.put('/users/:id', (req, res) => {
  connection(db => {
    db.collection('users')
    .update({_id: ObjectId(req.params.id)}, {$set: req.body})
    .then(ret => {
      res.status(200).send('ok').end();
    })
    .catch(err => {
      sendError(err, res);
    });
  });
});

router.delete('/users/:id', (req, res) => {
  connection(db => {
    db.collection('users')
    .remove({_id: ObjectId(req.params.id)}, {justOne: true})
    .then(ret => {
      res.status(200).send('ok').end();
    })
    .catch(err => {
      sendError(err, res);
    });
  });
});

module.exports = router;
