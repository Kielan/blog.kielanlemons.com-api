'use strict'
const Sequelize = require('sequelize')
const sequelize = require('./connection')

const Post = sequelize.define('posts', {
  author: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  timestamps: false
})

module.exports.Post = Post;
