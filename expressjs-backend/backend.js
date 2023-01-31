const express = require('express');
const cors = require('cors');

const userServices = require('./models/user-services');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    const name = req.query['name'];
    const job = req.query['job'];
    try {
        const result = await userServices.getUsers(name, job);
        res.send({users_list: result});         
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});

app.get('/users/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await userServices.findUserById(id);
    if (result === undefined || result === null)
        res.status(404).send('Resource not found.');
    else {
        res.send({users_list: result});
    }
});

app.post('/users', async (req, res) => {
    const user = req.body;
    const savedUser = await userServices.addUser(user);
    if (savedUser)
        res.status(201).send(savedUser);
    else
        res.status(500).end();
});
// get user by name and
app.get('/users', (req, res) => {
   const { name, job } = req.query;
 
   userServices.find({ name, job }, (users) => {
     return res.json(users);
   });
 });
// /users/<id> DELETE route to remove a user by id. 
app.delete('/users/:id', (req, res) => {
   const { id } = req.params;
 
   userServices.findByIdAndDelete(id, (deleted) => {
     if (!deleted) return res.status(404).send('User doesnt exist');
     return res.json(deleted);
   });
 });
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});