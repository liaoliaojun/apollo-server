import { Article } from '../providers/article';

export default {
  Query: {
    posts: (_root: any, _args: {}, { injector }: GraphQLModules.Context) =>
      injector.get(Article).getAll(),
  },
};
