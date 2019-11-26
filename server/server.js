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

  app.get('*', (req, res, next) => {
    if (req.headers.host.indexOf('liaoliaojun.com') !== -1 && !httpsServer) {
      let host = req.headers.host
      host = host.replace(/\:\d+$/, '') // Remove port number
      res.redirect(`https://${host}${req.path}`)
    } else {
      next()
    }
  })

  // history模式
  app.use(history({
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
  }))

  app.use(express.static(path.resolve(__dirname, '../../liaoliaojun-web/dist')))

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
