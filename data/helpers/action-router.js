const express = require('express');
const Actions = require('./actionModel.js');

const router = express.Router();

// ROUTES FOR server.use('/api/actions', actionRouter);
router.post('/', async (req,res) => {
    if (!req.body["project_id"] || !req.body.description || !req.body.notes) {
        res.status(400).json({error:'Please provide a project id / description / notes for this action.'});
    }
    else {
        try {
            const newPj = await Actions.insert(req.body);
            res.status(201).json(newPj);
        }
        catch(err) {
            res.status(500).json({error:"Failed to create resource."});
        }
    }
});

router.get('/', async (req, res) => {
    try {
        const pjs = await Actions.get();
        res.status(200).json(pjs);
    }
    catch(err) {
        res.status(500).json({error:"Failed to get resource."});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const pjs = await Actions.get(req.params.id);
        res.status(200).json(pjs);
    }
    catch(err) {
        res.status(500).json({error:"Failed to get resource."});
    }
});

router.put('/:id', async (req,res) => {
    if (!req.body) {
        res.status(400).json({error:'Please provide a description / notes for this action.'});
    }
    else {
        try {
            const newPj = await Actions.update(req.params.id,req.body);
            if (newPj === null) {
                res.status(404).json({error:"Cannot find action with that ID."});
            }
            else {
                res.status(201).json(newPj);
            }
        }
        catch(err) {
            res.status(500).json({error:"Failed to create resource."});
        }
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const pjs = await Actions.remove(req.params.id);
        if (pjs === 1) {
            res.status(200).json({message:"Resource deleted."});
        }
        else {
            res.status(404).json({error:"Cannot find action with that ID."});
        }
    }
    catch(err) {
        res.status(500).json({error:"Failed to delete resource."});
    }
});

module.exports = router;