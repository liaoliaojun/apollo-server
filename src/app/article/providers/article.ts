import {Injectable} from 'graphql-modules'
import {generate} from 'shortid'
import {db} from '../../../db/index'

// const articles = [
//   {
//     // 文章id
//     article_id: 'short_id',
//     // 文章标题
//     article_title: 'title',
//     // 文章内容
//     article_content: 'content',
//     // marked原文
//     article_marked_content: 'marked_content',
//     // 浏览量
//     article_views: 20,
//     // 创建文章时间
//     article_date: '2020-08-30',
//     // 创建文章时间戳
//     article_time_stamp: 300000,
//     // 文章点赞数
//     article_like_count: 1,
//     // 点赞的ip地址
//     article_like_ips: ['192.0.0.1'],
//     // 背景图地址(/保存至本服务器)
//     bg_path: '/img/path',
//     // 是否置顶（放置于首页轮播图）
//     is_top: true,
//     // 置顶权重
//     top_weight: 20,
//     // 标签
//     tags: ['tag1'],
//   },
// ]

@Injectable()
export class Article {
  // constructor (private)
  getArticle (id: string) {
    return db.get('articles').find({article_id: id}).value()
  }

  getAll () {
    return db.get('articles').value()
  }

  addArticle (input) {
    const articleInfo = {
      article_id: generate(),
      article_title: input.article_title,
      article_marked_content: input.article_marked_content,
      article_content: input.article_content,
      article_views: 1,
      article_date: '20201001 12:38',
      article_time_stamp: new Date().getTime(),
      article_like_count: 0,
      article_like_ips: [],
      bg_path: input.bg_path,
      is_top: input.is_top,
      top_weight: input.top_weight,
      tags: input.tags || [],
    }
    db.get('articles').unshift(articleInfo).write()
    return articleInfo.article_id
  }
}
