const express = require('express')
const router = express.Router()

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

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  res.send(genre);
});

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));

  const { error } = validateGenre(req.body.name);
  if (error) {
    return res.send(error.details[0].message);
  }

  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genres);
});

module.exports = router