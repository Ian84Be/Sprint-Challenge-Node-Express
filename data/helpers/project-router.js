const express = require('express');
const Projects = require('./projectModel.js');

const router = express.Router();

// server.use('/api/projects', projectRouter);
router.get('/', async (req, res) => {
    try {
        const pjs = await Projects.get();
        res.status(200).json(pjs);
    }
    catch(err) {
        res.status(500).json({error:"Failed to get resource."})
    }
});

module.exports = router;