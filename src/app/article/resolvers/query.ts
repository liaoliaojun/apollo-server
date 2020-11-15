import {Article} from '../providers/article'

export default {
  Query: {
    articles: (_root: any, _args: {}, {injector}: GraphQLModules.Context) =>
      injector.get(Article).getAll(),
    article: (_root: any, {article_id}: any, {injector}: GraphQLModules.Context) =>
      injector.get(Article).getArticle(article_id),
    tops: (_root: any, _args: {}, {injector}: GraphQLModules.Context) =>
      injector.get(Article).getTops(),
  },
};
