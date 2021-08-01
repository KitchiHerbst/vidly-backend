const config = require("config");
//needed to import the express module
const express = require("express");
const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const debug = require("debug")("app:startup");

//local imports
const log = require("./logger");
const auth = require("./authentication");

// this sets up our express app allowing us to use get, put, post, delete
const app = express();

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug('Morgan Enabled')
}
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// app.use(log)
// app.use(auth)

let genres = [
  {
    id: 1,
    name: "horror",
  },
  {
    id: 2,
    name: "comedy",
  },
  {
    id: 3,
    name: "thriller",
  },
  {
    id: 4,
    name: "romance",
  },
];

app.get("/", (req, res) => {
  res.send("bingo bongo");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body.name);
  if (error) {
    return res.send(error.details[0].message);
  }
  const newGenre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(newGenre);
  res.send(genres);
});

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));

  const { error } = validateGenre(req.body.name);
  if (error) {
    return res.send(error.details[0].message);
  }

  genre.name = req.body.name;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genres);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate({ name: genre });
};
