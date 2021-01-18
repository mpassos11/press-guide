const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Article = require('../models/Article');
const slugify = require('slugify');

router.get('/admin/articles', (req, res) => {
    Article.findAll({
        include: [{
            model: Category
        }]
    }).then(articles => {
        res.render('admin/articles/index', {
            articles: articles
        });
    });
});

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', {
            categories: categories
        });
    });
});

router.post('/admin/articles/save', (req, res) => {
    var article = {
        title: req.body.title,
        slug: slugify(req.body.title),
        body: req.body.body,
        categoryId: req.body.category
    };

    Article.create(article).then(() => {
        res.redirect('/admin/articles');
    });
});

router.post('/admin/articles/delete', (req, res) => {
    var id = req.body.id;

    // No undefined
    if (id == undefined)
        res.redirect('/admin/articles');

    // no number
    if (isNaN(id))
        res.redirect('/admin/articles');

    // Destroy
    Article.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/articles');
    });
});

router.get('/admin/articles/edit/:id', (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) res.redirect('/admin/articles');

    Article.findByPk(id).then(article => {
        if (article != undefined)
            Category.findAll().then(categories => {
                if (categories != undefined)
                    res.render('admin/articles/edit', { article: article, categories: categories });
            });
    }).catch(() => { res.redirect('/admin/articles'); });
});

router.post('/admin/articles/update', (req, res) => {
    var id = req.body.id;
    var article = {
        title: req.body.title,
        slug: slugify(req.body.title),
        body: req.body.body,
        categoryId: req.body.category
    };

    Article.update(article, {
        where: {id: id}
    }).then(() => {
        res.redirect('/admin/articles');
    });
});

module.exports = router;
