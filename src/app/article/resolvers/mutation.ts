import {Article} from '../providers/article'

export default {
  Mutation: {
    addArticle: (_root, {input}, {injector}: GraphQLModules.Context) => {
      return injector.get(Article).addArticle(input)
    },
    updateArticle: (_root, {input}, {injector}: GraphQLModules.Context) => {
      return injector.get(Article).updateArticle(input)
    },
    deleteArticle: (_root, {input}, {injector}: GraphQLModules.Context) => {
      return injector.get(Article).deleteArticle(input)
    },
    likeArticle: (_root, {article_id}, {injector, request}: GraphQLModules.Context) => {
      return injector.get(Article).likeArticle(article_id, request.ip || '')
    },
  },
};
