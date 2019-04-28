'use strict'
const { GraphQLNonNull } = require('graphql')
const PostType = require('../types/post')
const PostInputType = require('../types/input/postInput')

module.exports = {
  type: PostType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(PostInputType)
    }
  },
  resolve: (
    root,
    { data },
    context
  ) => {
    return new Promise(async (resolve, reject) => {
      console.log('blogPost postCreate args9112: ', data)
      let blogPost = await context.dataSources.CMSDataSource.createBlogPost(data)
      resolve(blogPost);
//      Post.sync().then(() => {
//        console.log(data);
//        return Post.create(data);
//      }).then(data => {
//        socket.publish('EVENT_CREATED', {
//          eventCreated: data
//        })
//        console.log('postCreate.js create.then data: ', data)
//        resolve(data)
//      })
//      .catch(errors => reject(errors))
    })
  }
}
