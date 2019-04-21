const { makeExecutableSchema } = require('graphql-tools')
const { find, filter } = require('lodash')

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

// The resolvers
const resolvers = {
  Query: {
    books: () => books,
    book: (_, { title }) => {
      return find(books, { title: title})
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
       console.log('Query.title resolve _: ', book)
       return slugItem[0].slug;
     },
   }
}

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

module.exports.resolvers = resolvers
module.exports.typeDefs = typeDefs
module.exports.schema = schema
module.exports.books = books
