// import { Article } from '../providers/article'

export default {
  Article: {
    article_id: (article: any) => {
      return article.article_id
    },
    title: (article: any) => article.title,
    content: (article: any) => article.content,
    marked_content: (article: any) => article.marked_content,
    views: (article: any) => article.views,
    date: (article: any) => article.date,
    time_stamp: (article: any) => article.time_stamp,
    like_count: (article: any) => article.like_count,
    like_ips: (article: any) => article.like_ips,
    bg_path: (article: any) => article.bg_path,
    is_top: (article: any) => article.is_top,
    top_weight: (article: any) => article.top_weight,
    tags: (article: any) => article.tags,
  },
};
