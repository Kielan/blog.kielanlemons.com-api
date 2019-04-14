// om namah shivay

// see https://www.apollographql.com/docs/apollo-server/example.html for more info

const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

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
    books: [book]
    book(title: String!): book
  }
  type book { title: String!, author: String!, slug: String! }
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
   book: {
     title: (root, args, context, info) => {
       //args is empty, need to match arg w book.title
       console.log('resolve Book: ', root, 'args: ', args, 'context', context, 'info', info);//JSON.stringify(root.book))
       return books.filter(book => book.title);//JSON.stringify({"title": root.title});
     }
   }
};
//    book: (_, { title }) => books.filter(book => book.title == title),


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
