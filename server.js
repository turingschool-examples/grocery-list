const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http').Server(app);
const cors = require('express-cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('port', 3001);
app.locals.title = 'Groceries'
app.locals.groceries = [
  { id: 1489863729151, name: 'Rutabagas', quantity: 10, purchased: false, starred: false },
  { id: 1489863740047, name: 'Beef Jerky', quantity: 1000, purchased: false, starred: false },
];

app.get('/api/v1/groceries', (request, response) => {
  response.status(200).send({ groceries: app.locals.groceries });
});

app.get('/api/v1/groceries/:id', (request, response) => {
  const { id } = request.params;
  const grocery = app.locals.groceries.find(m => m.id == id);
  if (grocery) { return response.send({ grocery }); }
});

app.post('/api/v1/groceries', (request, response) => {
  const { grocery } = request.body;

  grocery.id = grocery.id || Date.now();
  app.locals.groceries.push(grocery);
  response.status(201).send(app.locals.groceries);
});

app.put('/api/v1/groceries/:id', (request, response) => {
  const { grocery } = request.body;
  const { id } = request.params;
  const index = app.locals.groceries.findIndex((m) => m.id == id);

  const oldGrocery = app.locals.groceries[index];
  app.locals.groceries[index] = Object.assign(oldGrocery, grocery);

  return response.sendStatus(204);
});

app.delete('/api/v1/groceries/:id', (request, response) => {
  const { id } = request.params;
  app.locals.groceries = app.locals.groceries.filter((m) => m.id != id);
  response.sendStatus(204);
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
