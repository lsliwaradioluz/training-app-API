const express = require("express");
const router = express.Router();

const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('../graphql/schema')
const graphqlResolver = require('../graphql/resolvers')

router.use('/api/graphql', graphqlHTTP({
  schema: graphqlSchema, 
  rootValue: graphqlResolver,
  graphiql: true,
}))

module.exports = router