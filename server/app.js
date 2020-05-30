'use strict'
import fs from'fs'
// import url from'url'
import path from'path'
import https from 'https'
import express from 'express'
import context from './context'
import typeDefs from './type-defs'
import resolvers from './resolvers'
import {ApolloServer} from 'apollo-server-express'

const PORT = 3000
const app = express()

const httpsServer = https.createServer({
  key : fs.readFileSync(__dirname + '/ssl/api.liaoliaojun.com.key'),
  cert: fs.readFileSync(__dirname + '/ssl/api.liaoliaojun.com.crt'),
}, app)

app.use('/files', express.static(path.resolve(__dirname, '../live/uploads')))

const apollo = new ApolloServer({
  context,
  typeDefs,
  resolvers,
  playground: true,
})

apollo.applyMiddleware({app})

apollo.installSubscriptionHandlers(httpsServer)

httpsServer.listen(PORT, () => {
  const graphqlPath = apollo.graphqlPath
  console.log(`🚀 Graphql Server ready at localhost:${PORT}${graphqlPath}`)
})
