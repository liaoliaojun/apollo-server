import {createModule, gql} from 'graphql-modules'

export const UploadModule = createModule({
  id: 'upload',
  dirname: __dirname,
  typeDefs: gql`
    scalar Upload

    extend type Mutation {
      # upload
      singleUpload (file: Upload!, key: String!): File!
      multipleUpload (files: [Upload!]!, key: String!): [File!]!

      # download
      downImage (fileUrl: String!, key: String!): File!
    }

    type File {
      id: ID!
      path: String!
      filename: String!
      mimetype: String!
      encoding: String!
    }
  `,
  resolvers: {
    Mutation: {
      downImage: (_root, {input}, {injector}: GraphQLModules.Context) => {
        console.log(1232)
      },
    },
  },
})
