const express = require('express');
const router = express.Router();
const queries = require('../queries');
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
// Middleware --- all the routing needed for CRUD funcitonality!
// List all the Goals
router.get("/db", (request, response) => {
    queries.list().then(goals => {
        response.json({goals});
    }).catch(console.error);
});
// List a single goal as response
router.get("/db/:id", (request, response) => {
    queries.read(request.params.id).then(goals => {
        goals
            ? response.json({goals})
            : response.sendStatus(404)
    }).catch(console.error);
});
// Add a goal to goals database
router.post("/db", (request, response) => {
    queries.create(request.body).then(goal => {
        response.status(201).json({goals: goal});
    }).catch(console.error);
});
// remove a goal by ID from the database
router.delete("/db/:id", (request, response) => {
    queries.delete(request.params.id).then(() => {
        response.sendStatus(204);
    }).catch(console.error);
});
// update a goal in the database
router.put("/db/:id", (request, response) => {
    queries.update(request.params.id, request.body).then(resolution => {
        response.json({goal: resolution[0]});
    }).catch(console.error);
});

module.exports = router;
