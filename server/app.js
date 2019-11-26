'use strict'
import fs from'fs'
import url from'url'
import path from'path'
import https from 'https'
import express from 'express'
import history from 'connect-history-api-fallback'
import { ApolloServer } from 'apollo-server-express'
import genTheme from './theme/index.js'

import typeDefs from './schema'
import resolvers from './resolvers'
const app = express()
const PORT = 443

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
})

const server = https.createServer(
  {
    key : fs.readFileSync(__dirname + '/ssl/liaoliaojun.com.key'),
    cert: fs.readFileSync(__dirname + '/ssl/liaoliaojun.com.crt'),
  },
  app,
)

apollo.applyMiddleware({app})

// history模式
app.use(history({
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
}))
app.use(express.static(path.resolve(__dirname, '../../liaoliaojun-web/dist')))

app.get('/api/index.css', function(req, res){
  var query = url.parse(req.url, true).query
  genTheme(query, () => {
    res.writeHead(200, {'Content-Type': 'text/css'}) 
    res.write(fs.readFileSync(__dirname + '/theme/output/index.css', 'utf8')) // <--- add this line 
    res.end()
    // res.send(`'Hello World callback'`)
  })
})

apollo.installSubscriptionHandlers(server)

server.listen(PORT, () => {
  const graphqlPath = apollo.graphqlPath
  console.log(`🚀 Graphql Server ready at :${PORT}/${graphqlPath}`)
})