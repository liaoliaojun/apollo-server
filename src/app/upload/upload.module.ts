import {createModule, gql} from 'graphql-modules'
import checkKey from '../../utils/key'
import {processUpload, getImage} from '../../utils/upload'

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
      downImage: (_root, {key, fileUrl}, {injector}: GraphQLModules.Context) => {
        if (!checkKey(key)) return new Error ('check password failed')
        return getImage(fileUrl)
      },
      singleUpload: (_root, {key, file}, {injector}: GraphQLModules.Context) => {
        if (!checkKey(key)) return new Error ('check password failed')
        return processUpload(file)
      },
      multipleUpload: (_root, {key, files}, {injector}: GraphQLModules.Context) => {
        if (!checkKey(key)) return new Error ('check password failed')
        return Promise.all(files.map(processUpload))
      },
    }, 
  },
})
