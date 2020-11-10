import {Article} from '../providers/article'

export default {
  Mutation: {
    addArticle: (_root, {input}, {injector}: GraphQLModules.Context) => {
      return injector.get(Article).addArticle(input)
    },
  },
};
