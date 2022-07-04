const { response } = require("express");
const express = require("express");
const app = express();
const PORT = "3001";

var morgan = require("morgan");
morgan.token("person", function (req, res) {
  const newPerson = {
    name: req.body.name || "",
    number: req.body.number || "",
  };

  return JSON.stringify(newPerson);
});
app.use(morgan(":method :url :response-time :person"));
// app.use(morgan("tiny"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const timeStamp = new Date(Date.now());
  const personsNum = persons.length;

  res.send(
    `Phonebook has info for ${personsNum} people. <div>${timeStamp}</div>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const responsePerson = persons.find(
    (person) => person.id === Number(req.params.id)
  );
  responsePerson ? res.json(responsePerson) : res.sendStatus(404);
});

app.delete("/api/persons/:id", (req, res) => {
  persons = persons.filter((person) => person.id !== Number(req.params.id));

  res.sendStatus(204).end();
});

app.post("/api/persons", (req, res) => {
  const personId = Math.floor(Math.random() * 1000000000000000);

  const newPerson = {
    id: personId,
    name: req.body.name || "",
    number: req.body.number || "",
  };

  if (newPerson.name === "") {
    return res.status(400).send("Name must not be empty").end();
  } else if (newPerson.number === "") {
    return res.status(400).send("Number must not be empty").end();
  } else if (persons.find((person) => person.name === newPerson.name)) {
    return res.status(400).send("Name already exists").end();
  }
  // ) {
  //   return res.status(400).send("Test").end();
  // }
  // persons = persons.concat(newPerson);
  // res.sendStatus(200);

  res.json(newPerson);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
