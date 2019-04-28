'use strict'

// see https://www.apollographql.com/docs/apollo-server/example.html for more info
//const { createServer } = require('https');
const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const db = require('./db')
const { makeExecutableSchema } = require('graphql-tools')
const { find, filter } = require('lodash')
const { resolvers, schema, typeDefs } = require('./schema')
const queries = require('./queries')
const post = require('./types/post')
const context = require('./tools/context')
const { CMSDataSource } = require('./dataLayer')
// Some fake data
//test handling of apostrophes later
// and the Sorcerer's stone

console.log('CMSDataSource is not a constructorrep: ', CMSDataSource)
// GraphQL: Schema
const SERVER = new ApolloServer({
  schema: schema,
  dataSources: () => ({
    CMSDataSource: new CMSDataSource(),
  }),
  introspection: true,
  uploads: false,
  playground: {
    endpoint: `http://localhost:4000/graphql`,
    settings: {
      'editor.theme': 'light'
    }
  }
})

// Initialize the app
const app = express();

app.db = db;

// Middleware: GraphQL
SERVER.applyMiddleware({
  app: app
});

// Start the server
const port = process.env.PORT || 8080;

let server = app.listen(port, () => {
  console.log(`Go to http://localhost:${port}/graphiql to run queries!`);
});

module.exports.server = server
