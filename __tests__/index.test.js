'use strict'
const {
  addMockFunctionsToSchema,
  makeExecutableSchema,
  mockServer,
} = require('graphql-tools')
const { graphql } = require('graphql')
const EasyGraphQLTester = require('easygraphql-tester')
const { server } = require('../src/index')
const { books, typeDefs, resolvers } = require('../src/schema')
const CMSResolvers = resolvers
const { MockServiceORM } = require('../__mocks__/mockServiceORM')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// Here we specify the return payloads of mocked types
addMockFunctionsToSchema({
  schema: schema,
})

describe(`${__filename}__Resolvers`, () => {

  const testOutput = {
    author: 'J.K. Rowling',
    slug: 'harry_potter',
    title: 'Harry Potter',
  }

  const args = { slug: "harry_potter" }

  it('should return item {author: author}', () => {
    const ctx = {}

    const bookAuthorResolver = CMSResolvers.Book.author(testOutput, args, ctx)
    expect(bookAuthorResolver).toMatch(testOutput.author)
  })
  it('should return item {slug: slug}', () => {
    const ctx = {}

    const bookSlugResolver = CMSResolvers.Book.slug(testOutput, args, ctx)
    expect(bookSlugResolver).toEqual(testOutput.slug)
  })
  it('should return item {title: title}', () => {
    const ctx = {}

    const bookTitleResolver = CMSResolvers.Book.title(testOutput, args, ctx)
    expect(bookTitleResolver).toEqual(testOutput.title)
  })
})

describe(`${__filename}__Queries`, () => {
  let tester
  beforeAll(() => {
    tester = new EasyGraphQLTester(schema)
  })

  afterAll(async (done) => {
    server.close(done);
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

  const queriesTestCase = {
    query: `
          query {
            book(slug: "harry_potter") {
              author
              title
              slug
            }
          }`,
    variables: {},
    context: { MockServiceORM: () => MockServiceORM() },
//    context: { MockServiceOrm: MockServiceOrm() },
    expected: {
      "data": {
        "book": {
          "author": "Hello World",
          "slug": "Hello World",
          "title": "Hello World",
        },
      },
    },
  }
  const cases = [queriesTestCase]

  // running the test for each case in the cases array
  cases.forEach(async obj => {
    test('query book(title: ${title}', async (done) => {
      let { query, variables, context, expected } = obj
      //console.log('console.log_kielan query book(title: ${title}zzMockServiceInst: ', MockServiceInst());
//      const result = await graphql(schema, query, null, context.MockServiceORM(), variables);//context.MockServiceOrm(), variables);
      const result = await tester.graphql(query, undefined, context.MockServiceORM(), { isLocal: false })
      console.log('console.log_kielan tester.query book(title: ${title}zzresult: ', result);
      expect(result).toEqual(expected)
      done();
    })
  })
})
