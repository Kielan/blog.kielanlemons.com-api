// om namah shivay

// see https://www.apollographql.com/docs/apollo-server/example.html for more info

const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { find, filter } = require('lodash');

// Some fake data
//test handling of apostrophe later
// and the Sorcerer's stone
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
];

// The GraphQL schema in string form
const typeDefs = `
  type Query {
    books: [Book]
    book(title: String!): Book
    bookList: BookList
    title: Book
  }
  type Book {
    title: String!, author: String!, slug: String!
  }
  type BookList {
    books: [Book]
  }
`;

// The resolvers
const resolvers = {
  Query: {
    books: () => books,
    book: (_, { title }) => {
      return find(books, { title: title})
    },
    title: (_, { title }) => {
      console.log('hack Query.title resolve _: ', _, 'title', title)
      let book = find(books, { title: title });
      return book.title
    }
   },
   BookList: {
     books(title) {
       return filter(books, { title: title })
     }
   },
   Book: {
     author(book) {
       console.log('hack resolve Book authorZZ_: ', book, 'filter: ', filter(books, { author: book.author }))//JSON.stringify(title))
       let authorItem = filter(books, { author: book.author })
       return authorItem[0].author;
     },
     title(book) {
       let bookItem = filter(books, { title: book.title })
       console.log('hack resolve Book titleZZ_: ', bookItem)//JSON.stringify(title))
       return bookItem[0].title;
     },
     slug(book) {
       console.log('hack resolve Book slugZZ_: ', book, 'filter: ', filter(books, { slug: book.slug }))//JSON.stringify(title))
       let slugItem = filter(books, { slug: book.slug })
       return slugItem[0].slug;
     },
   }
};


// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// GraphQL: Schema
const SERVER = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  introspection: true,
  uploads: false,
  playground: {
    endpoint: `http://localhost:4000/graphql`,
    settings: {
      'editor.theme': 'light'
    }
  }
});

// Initialize the app
const app = express();

// Middleware: GraphQL
SERVER.applyMiddleware({
  app: app
});

// Start the server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Go to http://localhost:${port}/graphiql to run queries!`);
});
