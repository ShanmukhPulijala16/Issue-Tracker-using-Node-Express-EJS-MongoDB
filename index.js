//Requiring dotEnv
const dotEnv = require('dotenv');
dotEnv.config();

//Requiring EJS
const ejs = require('ejs');
//Requiring Express-Ejs-Layouts
const expressLayout = require('express-ejs-layouts');

//Requiring Path Module
const path = require('path');

//Requiring Express
const express = require('express');
const app = express();

//Requiring db.js
const connectDB = require('./server/config/db');

//Necessary Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Static Files
app.use(express.static('public'));

//Layout Settings
app.use(expressLayout);
app.set('layout', 'layouts/totalLayout.ejs');

//Templating Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const routes = require('./server/routes/index');
app.use('/', routes);

const port = process.env.PORT || 4001;
//Database Connection
connectDB().then(() => {
    app.listen(port, (req, res) => {
        console.log(`Listening on port: ${port}`);
    });
});
