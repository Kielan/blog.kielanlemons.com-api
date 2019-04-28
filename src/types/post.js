'use strict'
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: "Post",
  description: 'Itemized CMS atom, id or slug required for lookup.',
  args: {
    id: {
      name: 'id',
      type: GraphQLID
    },
    slug: {
      name: 'slug',
      type: GraphQLString
    },
  },
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    author: {
      type: new GraphQLNonNull(GraphQLString)
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        query: { type: GraphQLString }
      }
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
  })
})
