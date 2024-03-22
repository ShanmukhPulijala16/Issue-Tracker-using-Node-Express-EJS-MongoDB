const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

//Home Page
router.get('/', controllers.homePage);
//Add Project
router.post('/addProject', controllers.addProject);
//View Project
router.get('/view-project/:id', controllers.viewProject);
//Create Issue
router.post('/create-issue/:id', controllers.createIssue);

module.exports = router;