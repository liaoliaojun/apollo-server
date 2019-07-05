'use strict'
import path from'path'
import express from 'express'
import history from 'connect-history-api-fallback'
import { ApolloServer } from 'apollo-server-express'

import typeDefs from './schema'
import resolvers from './resolvers'
const app = express()
const PORT = 4001

const SERVER = new ApolloServer({
  typeDefs,
  resolvers,
})

SERVER.applyMiddleware({app})

// history模式
app.use(history({
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
}))
app.use(express.static(path.resolve(__dirname, '../dist')))

app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
);