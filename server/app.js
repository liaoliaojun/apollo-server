'use strict'
import path from'path'
import express from 'express'
import history from 'connect-history-api-fallback'
import { ApolloServer } from 'apollo-server-express'
import genTheme from './theme/index.js'

import typeDefs from './schema'
import resolvers from './resolvers'
const app = express()
const PORT = 8090

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

app.get('/hello.txt', function(req, res){
  genTheme('$--color-primary')
  res.send('Hello World1');
});

app.listen(PORT, () => {
    const graphqlPath = SERVER.graphqlPath;
    console.log(`🚀 Graphql Server ready at :${PORT}/${graphqlPath}`)
});