'use strict'
const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')
const { find, filter } = require('lodash')

const queries = require('./queries')
const mutations = require('./mutations')

const books = [
  {
    "title": "Harry Potter",
    "author": 'J.K. Rowling',
    "slug": "harry_potter",
  },
  {
    "title": 'Jurassic Park',
    "author": 'Michael Crichton',
    "slug": "jurassic_park",
  },
]

// The GraphQL schema in string form
const typeDefs = `
  type Query {
    books: [Book]
    book(slug: String! title: String): Book
    title: Book
  }
  type Book {
    title: String!, author: String!, slug: String!
  }
`
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: queries
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutations
  }),
})

// The resolvers
const resolvers = {
  Query: {
    books: () => books,
    book: (_, { slug }) => {
      console.log('Query.book resolve _ slug: ', slug)
      return find(books, { slug: slug})
    },
    title: (_, { title }) => {
      let book = find(books, { title: title });
      return book.title
    }
   },
   Book: {
     author(book) {
       let authorItem = filter(books, { author: book.author })
       return authorItem[0].author;
     },
     title(book) {
       let bookItem = filter(books, { title: book.title })
       return bookItem[0].title;
     },
     slug(book) {
       let slugItem = filter(books, { slug: book.slug })
       return slugItem[0].slug;
     },
   }
}

module.exports.resolvers = resolvers
module.exports.typeDefs = typeDefs
module.exports.schema = schema
module.exports.books = books
