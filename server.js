import express from 'express';
const app = express();

const port = process.env.PORT || 8080;

const people = [
  { id: 3, name: 'Bob', age: 34 },
  { id: 2, name: 'Ivan', age: 22 },
  { id: 4, name: 'Van', age: 34 },
  { id: 1, name: 'Karl', age: 42 },
  { id: 0, name: 'Anton', age: 21 },
];

app.get('/', (request /*Incoming*/, response /*Outgoing*/) => {
  // Any code we want
  // - Database connections
  // - Complicated operations
  // - Data lookup
  // - Third party API requests
  response.send('Hello world');
});

// With "Query Parameter"
// localhost:8080/people?name=Ivan
app.get('/people', (req, res) => {
  const { name } = req.query;

  const personsFound = people.filter((person) => person.name.includes(name));

  res.send(personsFound);
});

// With "Path Parameter"
app.get('/people/:id', (req, res) => {
  const { id } = req.params; // ID is a string here
  // const index = req.params.index;
  console.log(`The req.params are: ${JSON.stringify(req.params)}`);

  const personFound = people.find(
    (person) => person.id === +id /* Convert to num */
  );

  res.send(personFound);
});

app.listen(port, () => {
  console.log('Hello World, the server is running');
});
