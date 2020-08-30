import { Article } from '../providers/article';

export default {
  Post: {
    id: (post: any) => post._id,
    title: (post: any) => post.title,
  },
};
