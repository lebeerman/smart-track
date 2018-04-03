# SMART Track App
---
A basic Goal Keeping CRUD app.  
  * [Live App](https://smart-trak.firebaseapp.com/)
  * API repo [HERE](https://github.com/lebeerman/smart-track-express)

Current user flow - create an account, add/save/delete goals, mark goals complete.
Create an account.

## Demo Gif:

![SMART Trak Gif](./smartTrak.gif)

### Feedback welcome!

To Install:
```
git clone [this repo address]
cd [this folder]
npm install

npm start
```
Note: You will need to setup local variables, pull the server code and create an Okta account to develop this project further.

---
### To Do:
- Edittable Goals once submitted. 
- Counter of completed goal.
- links to SMART goal strategies.
- User account management.
- Redux!!!

### Bug fixes/known issues: 
* on logging in a second time during a browser session, occasional lockup of browser. Redirect issue?


---
### Back End References:
- [Data Modeling, JSON + Postgres](https://blog.codeship.com/unleash-the-power-of-storing-json-in-postgres/)
- [React app + node/express](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0)

- Take a look at [this repo](https://github.com/esausilva/quick-node-server/blob/master/server.js) for examples of serving static files.

- Heroku deployment help video by Stephen Grider [here](https://youtu.be/Ru3Rj_hM8bo) 

- Random Example code:
  * https://gist.github.com/lucdew/10d7ab14a2b4db106285
  * https://medium.com/@jaeger.rob/seed-knex-postgresql-database-with-json-data-3677c6e7c9bc
  * http://frontend.turing.io/lessons/module-4/knex-postgres.html

### Auth Help: This is basically THE walkthrough: [OKTA + REACT + EXPRESS/NODE](https://developer.okta.com/blog/2018/02/06/build-user-registration-with-node-react-and-okta)Copyright <YEAR> <COPYRIGHT HOLDER>

---
# LICENSE

MIT

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
