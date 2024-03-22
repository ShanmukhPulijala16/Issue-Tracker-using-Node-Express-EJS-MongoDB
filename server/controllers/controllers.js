const projectModel = require('../models/projectModel');
const issueModel = require('../models/issueModel');

module.exports.homePage = async (req, res) => {
    const locals = {
        title: "Issue Tracker Home Page"
    }
    let docs = [];
    try {
        const result = await projectModel.find({});
        docs = result;
    } catch (error) {
        console.log(error);
    }
    res.render('index', { locals, docs });
};

module.exports.viewProject = async (req, res) => {
    const locals = {
        title: "Issue Tracker View Project"
    }
    let project = null;
    let issuesArray = [];
    try {
        project = await projectModel.findOne({ _id: req.params.id });
        for (let id of project.issues) {
            // console.log(`ID is: ${id}`);
            let issue = await issueModel.findById(id);
            issuesArray.push(issue);
        }
    } catch (error) {
        console.log(error);
    }
    res.render('project/view-project', { locals, project, issuesArray });
};

//Create and Add Project to Database and then redirect to home page
module.exports.addProject = async (req, res) => {
    const locals = {
        title: "Issue Tracker Add Project"
    }
    const newProject = {
        name: req.body.name,
        description: req.body.description,
        author: req.body.author
    }
    try {
        await projectModel.create({
            name: newProject.name,
            description: newProject.description,
            author: newProject.author
        });
        res.redirect('/');
    } catch (error) {
        console.log(`error: ${error}`);
    }
}

//Create Issue
module.exports.createIssue = async (req, res) => {
    try {
        let project = await projectModel.findById(req.params.id);
        if (project) {
            let issue = await issueModel.create({
                title: req.body.title,
                description: req.body.description,
                labels: req.body.labels,
                author: req.body.author,
            });
            console.log(`labels are -> ${req.body.labels}`);
            project.issues.push(issue);
            console.log(project);
            if (!(typeof req.body.labels === 'string')) {
                for (let label of req.body.labels) {
                    let isPresent = project.labels.find((obj) => obj == label);
                    if (!isPresent) {
                        project.labels.push(label);
                    }
                }
            } else {
                let isPresent = project.labels.find((obj) => obj == req.body.labels);
                if (!isPresent) {
                    project.labels.push(req.body.labels);
                }
            }
            await project.save();
            return res.redirect(`back`);
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        return res.redirect('back');
    }
};