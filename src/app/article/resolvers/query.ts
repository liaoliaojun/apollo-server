import { Article } from '../providers/article';

export default {
  Query: {
    articles: (_root: any, _args: {}, { injector }: GraphQLModules.Context) =>
      injector.get(Article).getAll(),
  },
};
