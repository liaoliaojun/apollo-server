const config = {
  qq: '1030219089',
  author: 'liaoliaojun',
  email: '1030219089a@gamil.com',
}

const resolvers = {
  Query: {
    config: () => {
      return config
    },
  }
};

export default resolvers;