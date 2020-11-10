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
import {UserModule} from './app/user/user.module'
import {AuthModule} from './app/auth/auth.module'
import {OwnerModule} from './app/owner/owner.module'
import {UploadModule} from './app/upload/upload.module'
import {ArticleModule} from './app/article/index'
import {SocialNetworkModule} from './app/social-network/social-network.module'
import {fetchConfig} from './config'

const server = express()
const app = createApplication({
  modules: [ArticleModule, UserModule, AuthModule, OwnerModule, UploadModule, SocialNetworkModule],
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
    context: { request },
  }))
)

server.listen(4000, () => {
  console.log('Live http://localhost:4000/graphql')
})
