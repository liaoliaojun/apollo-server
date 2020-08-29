import {Injectable} from 'graphql-modules'

const articles = [
  {
    // 文章id
    article_id: 'short_id',
    // 文章标题
    article_title: 'title',
    // 文章内容
    article_content: 'content',
    // marked原文
    article_marked_content: 'marked_content',
    // 浏览量
    article_views: 20,
    // 创建文章时间
    article_date: '2020-08-30',
    // 创建文章时间戳
    article_time_stamp: 300000,
    // 文章点赞数
    article_like_count: 1,
    // 点赞的ip地址
    article_like_ips: ['192.0.0.1'],
    // 背景图地址(/保存至本服务器)
    bg_path: '/img/path',
    // 是否置顶（放置于首页轮播图）
    is_top: true,
    // 置顶权重
    top_weight: 20,
    // 标签
    tags: ['tag1'],
  },
]

@Injectable()
export class Article {
  // constructor (private)
  getArticle (id: string) {
    return articles.find(item => id === item.article_id)
  }

  getAll () {
    return articles
  }
}
