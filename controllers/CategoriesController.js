const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const slugify = require('slugify');

router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new');
});

router.post('/admin/categories/save', (req, res) => {
    var title = req.body.title;
    
    // no title undefined
    if (title == undefined)
        res.redirect('/admin/categories/new');

    Category.create({
        title: title,
        slug: slugify(title)
    }).then(() => {
        res.redirect('/')
    });
});

router.get('/admin/categories', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/categories/index', {
            categories: categories
        });
    });
});

module.exports = router;
