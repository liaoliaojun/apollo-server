// import { Article } from '../providers/article'

export default {
  Article: {
    article_id: (article: any) => {
      return article.article_id
    },
    article_title: (article: any) => article.article_title,
    article_content: (article: any) => article.article_content,
    article_marked_content: (article: any) => article.article_marked_content,
    article_views: (article: any) => article.article_views,
    article_date: (article: any) => article.article_date,
    article_time_stamp: (article: any) => article.article_time_stamp,
    article_like_count: (article: any) => article.article_like_count,
    article_like_ips: (article: any) => article.article_like_ips,
    bg_path: (article: any) => article.bg_path,
    is_top: (article: any) => article.is_top,
    top_weight: (article: any) => article.top_weight,
    tags: (article: any) => article.tags,
  },
};
