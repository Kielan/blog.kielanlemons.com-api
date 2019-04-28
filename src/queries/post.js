const { GraphQLID, GraphQLNonNull, GraphQLString } = require('graphql')
const PostType = require('../types/post')
const getProjection = require('../tools/projection')

module.exports = {
  type: PostType,
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
  resolve: (
    root,
    { slug },
    context,
    fieldASTs
  ) => {
    return new Promise(async (resolve, req) => {
      const q = {
        where: {slug: slug},
      };
      console.log('query post.js context31: ', slug)//context.dataSources.CMSDataSource)//fieldASTs)

      let blogPost = await context.dataSources.CMSDataSource.getBlogPost(slug)
      console.log('query post.js context34: ', blogPost)//fieldASTs)

      resolve(blogPost)
    })
  }
}
