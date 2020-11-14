import {
  createModule,
  gql,
} from 'graphql-modules'
import Dayjs from 'dayjs'
import {db} from '../../db/'

import UTC from 'dayjs/plugin/utc'
import 'dayjs/locale/zh-cn'
// 加载UTC插件
Dayjs.extend(UTC)
// 全局使用中文
Dayjs.locale('zh-cn')


interface OwnerModule {
  author: string;
  email: string;
  website: string;
}

export const OwnerModule = createModule({
  id: 'owner',
  dirname: __dirname,
  typeDefs: gql`
    extend type Query {
      owner: OwnerType!
    }

    extend type Mutation {
      saveVisitor: Boolean!
    }

    type OwnerType {
      author: String
      email: String
      website: String
    }
  `,
  resolvers: {
    Query: {
      owner(_root: {}, _args: {}, context: GraphQLModules.Context) {
        return db.get('owner').value()
      },
    },
    Mutation: {
      saveVisitor(_root: {}, _args: {}, {request}: GraphQLModules.Context) {
        const ip: string = request.ip
        const visitor = db.get('visitors').find({ip}).value()
        const chinaTime = Dayjs.utc().utcOffset(480).format('MMMMDD, YYYY HH点mm分')
        if (!visitor) {
          db.get('visitors').unshift({ip, visit_time_local: chinaTime, visit_time_stamp: new Date().getTime()}).write()
        } else {
          db.get('visitors').find({ip}).assign({visit_time_local: chinaTime, visit_time_stamp: new Date().getTime()}).write()
        }
        return true
      },
    },
  },
})
