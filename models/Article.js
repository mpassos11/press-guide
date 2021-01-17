const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('./Category');

const Article = connection.define('articles', {
    title: { 
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// A article belongs a category (1..1)
Article.belongsTo(Category);

// A category has many articles (1..N)
Category.hasMany(Article);

module.exports = Article;
