declare global {
  namespace GraphQLModules {
    interface GlobalContext {
      request: any
    }
  }
}

import 'reflect-metadata'
import {createApplication} from 'graphql-modules'
import express from 'express'
import {graphqlHTTP} from 'express-graphql'
// import {UserModule} from './app/user/user.module'
// import {AuthModule} from './app/auth/auth.module'
import {OwnerModule} from './app/owner/owner.module'
import {UploadModule} from './app/upload/upload.module'
import {ArticleModule} from './app/article/index'
// import {SocialNetworkModule} from './app/social-network/social-network.module'
import {fetchConfig} from './config'

const server = express()

server.all('*', function(req, res, next) {
  const allowOrigins = ['http://dev.liaoliaojun.com', 'https://dev.liaoliaojun.com', 'http://www.liaoliaojun.com', 'https://www.liaoliaojun.com']
  const origin = req.headers.origin as string

  if (origin && allowOrigins.some(item => origin.indexOf(item) === 0)) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By',' 3.2.1')
  
    if (req.method === 'OPTIONS') {
      res.send(200)
    } else {
      next()
    }
  } else {
    next()
  }
})

const app = createApplication({
  modules: [ArticleModule, OwnerModule, UploadModule],
})
const execute = app.createExecution()

// sync fetch config
fetchConfig()

server.use(
  '/graphql',
  graphqlHTTP((request: any) => ({
    schema: app.schema,
    graphiql: true,
    customExecuteFn: execute as any,
    context: {request},
  }))
)

server.listen(4000, () => {
  console.log('Live http://localhost:4000/graphql')
})
