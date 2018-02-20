const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const queries = require('queries');
const port = (process.env.PORT || 5000);
// New toys for oAuth!
const router = express.Router();
const oktaClient = require('../lib/oktaClient');

/* Create a new User (register). */
router.post('/', (req, res, next) => {
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
  oktaClient.createUser(newUser)
    .then(user => {
      res.status(201);
      res.send(user);
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    })
});
// -- END AUTH Stuff --
app.use(bodyParser.json());
//placeholder test route.
app.get('/api/hello', (req, res) => {
  res.send({ express: 'HELLO from EXPRESS!'});
});

// Middleware --- all the routing needed for CRUD funcitonality!
// List all the Goals
app.get("/goals", (request, response) => {
    queries.list().then(goals => {
        response.json({goals});
    }).catch(console.error);
});
// List a single goal as response
app.get("/goals/:id", (request, response) => {
    queries.read(request.params.id).then(goals => {
        goals
            ? response.json({goals})
            : response.sendStatus(404)
    }).catch(console.error);
});
// Add a goal to goals database
app.post("/goals", (request, response) => {
    queries.create(request.body).then(goal => {
        response.status(201).json({goals: goal});
    }).catch(console.error);
});
// remove a goal by ID from the database
app.delete("/goals/:id", (request, response) => {
    queries.delete(request.params.id).then(() => {
        response.sendStatus(204);
    }).catch(console.error);
});

app.put("/goals/:id", (request, response) => {
    queries.update(request.params.id, request.body).then(resolution => {
        response.json({resolution: resolution[0]});
    }).catch(console.error);
});

app.use((request, response) => {
    response.send(404);
});









// route for production and deployment
app.use(‘/’, express.static(`${__dirname}/client/build`));

app.listen(port, () => console.log(`Listening on port ${port}`));