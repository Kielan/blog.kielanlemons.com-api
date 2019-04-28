'use strict'
const { DataSource } = require('apollo-datasource')
const { Post } = require('../db')

const createStore = () => {
  return {
    Post
  }
}

class CMSDataSource extends DataSource {
  constructor() {
    super();
    this.store = createStore();
  }
  async getBlogPost(slug) {
    const blogPost = await this.store.Post.findOne({ where: { slug } })
    return blogPost;
  }
  async createBlogPost(data) {
    const createPostRes = this.store.Post.create(data)
    return createPostRes;
  }
}

module.exports.CMSDataSource = CMSDataSource;
