'use strict'
const { GraphQLList, GraphQLInt } = require('graphql')
const PostType = require('../types/post')
const getProjection = require('../tools/projection')

module.exports = {
  type: new GraphQLList(PostType),
  args: {
    first: {
      name: 'limit',
      type: GraphQLInt
    },
    skip: {
      name: 'offset',
      type: GraphQLInt
    }
  },
  resolve: (
    root,
    { first = null, skip = null },
    { req: {app: {db: {Post }}} },
    fieldASTs
  ) => {
    return new Promise((resolve, reject) => {
      const projection = Object.keys(getProjection(fieldASTs));
      const q = {
        attributes: projection,
        offset: skip,
        limit: first
      }
      Post.findAll(q)
        .then(posts => resolve(posts))
        .catch(errors => reject(errors));
    })
  }
}
