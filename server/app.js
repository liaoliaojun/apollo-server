'use strict'
import fs from'fs'
// import url from'url'
// import path from'path'
import https from 'https'
import express from 'express'
import typeDefs from './schema'
import resolvers from './resolvers'
import {ApolloServer} from 'apollo-server-express'

const PORT = 3000
const app = express()
const httpsServer = https.createServer({
  key : fs.readFileSync(__dirname + '/ssl/liaoliaojun.com.key'),
  cert: fs.readFileSync(__dirname + '/ssl/liaoliaojun.com.crt'),
}, app)

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  // playground: true,
})

apollo.applyMiddleware({app})

apollo.installSubscriptionHandlers(httpsServer)

httpsServer.listen(PORT, () => {
  const graphqlPath = apollo.graphqlPath
  console.log(`🚀 Graphql Server ready at localhost:${PORT}${graphqlPath}`)
})
