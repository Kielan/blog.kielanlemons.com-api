'use strict'
const { Post } = require('../db')

const getPost = async req => {
  if (!req) {
    return null
  }
  console.log('context.js kdl req77?: ', req.body.variables.slug)
  try {
    console.log('try getpost try: ', Post);
    return await Post.findOne({ where: {slug: req.body.variables.slug} }).then(blog => {
      console.log('context.js kdlreturn await Post.findOne: ', blog)
      return blog;
      // project will be the first entry of the Projects table with the title 'aProject' || null
    })
  } catch (error) {
    return null
  }
}

module.exports = {
  getPost
}
