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
        res.redirect('/admin/categories')
    });
});

router.get('/admin/categories', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/categories', {
            categories: categories
        });
    });
});

router.post('/admin/categories/delete', (req, res) => {
    var id = req.body.id;

    // No undefined
    if (id == undefined)
        res.redirect('/admin/categories');

    // no number
    if (isNaN(id))
        res.redirect('/admin/categories');

    // Destroy
    Category.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/categories');
    });
});

router.get('/admin/categories/edit/:id', (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.redirect('/admin/categories');
    }

    Category.findByPk(id).then(category => {
        if (category != undefined)
            res.render('admin/categories/edit', {
                category: category,
            });
    }).catch(error => {
        console.error(error);
        res.redirect('/admin/categories');
    });
});

router.post('/admin/categories/update', (req, res) => {
    var id = req.body.id;
    var category = {
        title: req.body.title,
        slug: slugify(req.body.title)
    };

    Category.update(category, {
        where: {id: id}
    }).then(() => {
        res.redirect('/admin/categories');
    });
});

module.exports = router;
