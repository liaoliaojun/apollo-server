const resolvers = {
  Query: {
    owner: (root, args, {db}) => {
      return db.get('owner').value()
    },
    articles: (root, args, {db}) => {
      return db.get('articles').value()
    },
  },
}

export default resolvers
