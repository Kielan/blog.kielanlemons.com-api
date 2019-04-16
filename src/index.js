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
  }
  type Book { title: String!, author: String!, slug: String! }
`;

// The resolvers
const resolvers = {
  Query: {
    books: () => books,
    book: (_, { title }) => books.filter(book => {
      return new Promise((resolve, reject) => {
        if(book.title == title) {
          console.log('hack log resolve book _: ', JSON.stringify(book))
          resolve(JSON.stringify(book));
        }
      })
    }),
   },
   Book: {
     title: (root, args, context, info) => {
       //args is empty, need to match arg w book.title
       /*
       context:  {
        _extensionStack:
         GraphQLExtensionStack {
           extensions: [ [FormatErrorExtension], [CacheControlExtension] ]
         }
       }
       */
       console.log('resolve Book args: ', args, 'info', info);//JSON.stringify(root.book))
       return books.filter(book => {
         if(book.title == root.title) {
           return book;
         }
       });
     }
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
