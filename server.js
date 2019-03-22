require('dotenv').config();

const express = require('express');

const actionRouter = require('./data/helpers/action-router.js');
const projectRouter = require('./data/helpers/project-router.js');

const server = express();

server.use(express.json());

// routing
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req,res) => {
    res.send(` <h1>${process.env.GREETING}</h1> `)
});

module.exports = server;