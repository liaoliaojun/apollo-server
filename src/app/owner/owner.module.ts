import {
  createModule,
  gql,
} from 'graphql-modules'
import {db} from '../../db/'

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
  },
})
