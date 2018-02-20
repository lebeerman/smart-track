# SMART Track App

---

A basic CRUD app

---
References:
- https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0

- For production you would need to run yarn build inside the client directory, then CRA will create a build directory with the production build. Back to the server.js file, require path and add the following line
```
app.use(‘/’, express.static(`${__dirname}/client/build`));
```
Take a look at [this repo](https://github.com/esausilva/quick-node-server/blob/master/server.js) for reference, in this example I show how to serve static files with node, which is basically what you need.

Now to deploy to Heroku you need to take several steps, Stephen Grider does an excellent job in [this video](https://youtu.be/Ru3Rj_hM8bo) detailing the process on deploying to Heroku.


### Auth Help: 
- https://developer.okta.com/blog/2017/03/30/react-okta-sign-in-widget
- https://dzone.com/articles/build-user-registration-with-node-react-and-okta

---

# RUBRIC

## API

* [ ] Deployed
* [ ] Well-organized
* [ ] Returns CORS headers
* [ ] API returns sane status codes

Can take the following actions:

### Table 1 & Table 2

* [ ] List   [ ] List
* [ ] Read   [ ] Read    
* [ ] Create [ ] Create
* [ ] Update [ ] Update
* [ ] Delete [ ] Delete

### Database

* [ ] Uses migrations
* [ ] Uses seeds
* [ ] Database is connected

## Front-End

* [ ] Deployed
* [ ] Has at least two components
* [ ] Includes at least two end-to-end tests
* [ ] Integrates a non-trivial library
* [ ] Appropriately styled

### Model 1 & Model 2

* [ ] List   [ ] List
* [ ] Read   [ ] Read    
* [ ] Create [ ] Create
* [ ] Update [ ] Update
* [ ] Delete [ ] Delete
