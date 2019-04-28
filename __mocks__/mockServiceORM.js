// ********* DUMMY DATA SOURCE *********  //
// otherwise you get hello world for all values
const casual = require('casual')
const RandExp = require('randexp')
const {
    MockList
} = require('graphql-tools')
const {
    startCase
} = require('lodash')

const booksMock = [
  {
    "author": 'J.K. Rowling',
    "slug": 'harry_potter',
    "title": 'Harry Potter'
  },
  {
    "author": 'Michael Crichton',
    "slug": 'jurassic_park',
    "title": 'Jurassic Park'
  },
]

const postsMockTwo = {
  Post: () => ({
    author: '',
    slug: '',
    title: '',
  })
}

const MockServiceORM = () => postsMockTwo

module.exports = { MockServiceORM }
