const express = require('express');
const Projects = require('./projectModel.js');

const router = express.Router();

// ROUTES FOR server.use('/api/projects', projectRouter);
router.post('/', async (req,res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({error:'Please provide a name / description for this project.'});
    }
    try {
        const newPj = await Projects.insert(req.body);
        res.status(201).json(newPj);
    }
    catch(err) {
        res.status(500).json({error:"Failed to create resource."});
    }
});

router.get('/', async (req, res) => {
    // console.log(req.query.id);
    // console.log(req.query.actions);
    try {
        const pjs = await Projects.get();
        res.status(200).json(pjs);
    }
    catch(err) {
        res.status(500).json({error:"Failed to get resource."});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const pjs = await Projects.get(req.params.id);
        res.status(200).json(pjs);
    }
    catch(err) {
        res.status(500).json({error:"Failed to get resource."});
    }
});

router.get('/:id/actions', async (req, res) => {
    try {
        const pjs = await Projects.getProjectActions(req.params.id);
        res.status(200).json(pjs);
    }
    catch(err) {
        res.status(500).json({error:"Failed to get resource."});
    }
});

router.put('/:id', async (req,res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({error:'Please provide a name / description for this project.'});
    }
    try {
        const newPj = await Projects.update(req.params.id,req.body);
        if (newPj === null) {
            res.status(404).json({error:"Cannot find project with that ID."});
        }
        else {
            res.status(201).json(newPj);
        }
    }
    catch(err) {
        res.status(500).json({error:"Failed to create resource."});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const pjs = await Projects.remove(req.params.id);
        if (pjs === 1) {
            res.status(200).json({message:"Resource deleted."});
        }
        else {
            res.status(404).json({error:"Cannot find project with that ID."});
        }
    }
    catch(err) {
        res.status(500).json({error:"Failed to delete resource."});
    }
});

module.exports = router;