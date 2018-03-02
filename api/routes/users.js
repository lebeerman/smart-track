const express = require('express');
const router = express.Router();
const oktaClient = require('../lib/oktaClient');

/* Create a new User (register). */
router.post('/', (req, res, next) => {
  console.log('Made it to the user routes:',req.body);
  if (!req.body) return res.sendStatus(400);
  const newUser = {
    profile: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      login: req.body.email
    },
    credentials: {
      password: {
        value: req.body.password
      }
    }
  };
  oktaClient
    .createUser(newUser)
    .then(user => {
      res.status(201);
      res.send(user);
    })
    .catch(next)
    // .catch(err => {
    //   console.log('In the oktaClient FAIL: ', err)
    //   res.status(400);
    //   // console.log(Object.keys(err))
    //   res.send({message: err.message, stack: err.stack});
    // });
});

module.exports = router;
