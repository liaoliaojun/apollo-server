import { gql } from 'apollo-server-express'

const typeDefs = gql`
    type config {
        qq: String
        author: String
        email: String
    }
    type Query {
        config: config
    }
`

export default typeDefs