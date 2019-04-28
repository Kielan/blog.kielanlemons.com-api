'use strict'
const { GraphQLInputObjectType, GraphQLString } = require('graphql')

module.exports = new GraphQLInputObjectType({
  name: 'PostInput',
  fields: {
    author: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    slug: {
      type: GraphQLString
    },
  }
})
