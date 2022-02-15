declare global {
  namespace GraphQLModules {
    interface GlobalContext {
      request: any
    }
  }
}

import 'reflect-metadata'
import express from 'express'
import path from'path'
import {graphqlHTTP} from 'express-graphql'
import {createApplication} from 'graphql-modules'
import {graphqlUploadExpress} from 'graphql-upload'
// import {UserModule} from './app/user/user.module'
// import {AuthModule} from './app/auth/auth.module'
import {OwnerModule} from './app/owner/owner.module'
import {UploadModule} from './app/upload/upload.module'
import {ArticleModule} from './app/article/index'
// import {SocialNetworkModule} from './app/social-network/social-network.module'
import {fetchConfig} from './config'

const server = express()

server.use('/files', express.static(path.resolve(__dirname, '../live/uploads')))

server.all('*', function(req, res, next) {
  // const allowOrigins = ['http://liaoliaojun.com', 'https://liaoliaojun.com',  'http://dev.liaoliaojun.com', 'https://dev.liaoliaojun.com', 'http://www.liaoliaojun.com', 'https://www.liaoliaojun.com']
  const origin = req.headers.origin as string

  // origin && allowOrigins.some(item => origin.indexOf(item) === 0)
  if (origin) {
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
  graphqlUploadExpress({maxFileSize: 10000000, maxFiles: 10}),
  graphqlHTTP((request: any) => ({
    schema: app.schema,
    graphiql: true,
    customExecuteFn: execute as any,
    context: {request},
    // uploads: false,
  }))
)

server.listen(3000, () => {
  console.log('Live http://localhost:3000/graphql')
})
