import path from'path'
import express from 'express'
import typeDefs from './schema'
import resolvers from './resolvers'
import history from 'connect-history-api-fallback'
import { ApolloServer } from 'apollo-server-express'

export default function (app, httpsServer, PORT) {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
  })

  apollo.applyMiddleware({app})

  // history模式
  app.use(history({
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
  }))

  app.use(express.static(path.resolve(__dirname, '../../liaoliaojun-web/dist')))

  app.get('*', (req, res, next) => {
    if (req.headers.host.indexOf('liaoliaojun.com') !== -1 && !httpsServer) {
      let host = req.headers.host
      host = host.replace(/\:\d+$/, '') // Remove port number
      res.redirect(`https://${host}${req.path}`)
    } else {
      next()
    }
  })

  app.get('/api/index.css', function(req, res) {
    var query = url.parse(req.url, true).query
    genTheme(query, () => {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(fs.readFileSync(__dirname + '/theme/output/index.css', 'utf8')) // <--- add this line 
      res.end()
      // res.send(`'Hello World callback'`)
    })
  })

  if (httpsServer) {
    apollo.installSubscriptionHandlers(httpsServer)
    httpsServer.listen(PORT, () => {
      const graphqlPath = apollo.graphqlPath
      console.log(`🚀 Graphql Server ready at :${PORT}/${graphqlPath}`)
    })
    return
  }

  // http
  app.listen(PORT, () => {
    const graphqlPath = apollo.graphqlPath;
    console.log(`🚀 Graphql Server ready at :${PORT}/${graphqlPath}`)
  })
}
