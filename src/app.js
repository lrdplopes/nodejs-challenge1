const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const project = {
    id: uuidv4(),
    title: "Node.js - Challenge 1",
    url: "https://github.com/lrdplopes/nodejs-challenge1",
    techs: "Node.js",
    likes: 0,
  };

  repositories.push(project);
  return res.json(project);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const projectFindIndex = repositories.findIndex((project) => {
    project.id === id;
  });

  if (!projectFindIndex === -1) {
    return res.status(400).json({ error: "Project doesn't exists" });
  }

  const projectsRepository = {
    id,
    title,
    url,
    techs,
    likes: repositories[projectFindIndex].likes,
  };

  repositories[projectFindIndex] = projectsRepository;

  return res.json(projectsRepository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const projectFindIndex = repositories.findIndex(
    (project) => project.id === id
  );

  if (projectFindIndex >= 0) {
    repositories.splice(projectFindIndex, 1);
  } else {
    return res.status(400).json({ error: "Project doesn't exists" });
  }

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const projectFindIndex = repositories.findIndex(
    (project) => project.id === id
  );

  if (projectFindIndex === -1) {
    return res.status(400).json({ error: "Project doesn't exists" });
  }

  repositories[projectFindIndex].likes++;

  return res.json(repositories[projectFindIndex]);
});

module.exports = app;
