import typeDefs from './schema'
import resolvers from './resolvers'
import {ApolloServer} from 'apollo-server-express'

export default function (app, PORT) {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
  })

  apollo.applyMiddleware({app})

  app.listen(PORT, () => {
    const graphqlPath = apollo.graphqlPath;
    console.log(`🚀 Graphql Server ready at https://dev.liaoliaojun.com:${PORT}${graphqlPath}`)
  })
}
