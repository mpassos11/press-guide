const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/database')
const app = express();

// Controllers
const articlesController = require('./controllers/ArticlesController');
const categoriesController = require('./controllers/CategoriesController');

// Models
const articleModel = require('./models/Article');
const categoryModel = require('./models/Category');

// view engine
app.set('view engine', 'ejs');

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Static files
app.use(express.static('public'));

// Database
connection
    .authenticate()
    .catch((error) => {
        console.error(error);
    });

app.use('/', categoriesController);
app.use('/', articlesController);

app.get("/", (req, res) => {
    res.render('index');
});

app.listen(4000, () => {
    console.log("App is working!");
});