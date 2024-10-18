const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000
const cors = require('cors')

const corsOptions ={
  origin:'*',     //"http://localhost:5173"
  methods:"GET,POST,PUT,PATCH,DELETE,HEAD",
  Credentials:true,
};


app.use(cors(corsOptions));

app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )

app.get('/', (request, response) => {

  console.log("inside function");
  response.json('Node.js, Express, and Postgres API');
});


app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);



app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})