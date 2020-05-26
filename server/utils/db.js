import Lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import {resolve} from 'path'

export const db = new Lowdb(new FileSync(resolve(__dirname, '../../live/db.json')))

db.defaults({
  // 博主信息
  owner: {
    author: '了了君',
    email: '1030219089a@gamil.com',
    website: 'https://liaoliaojun.com',
  },
  // 访客信息
  visitors: [],
  // 文章列表
  articles: [
    // {
    //   // 文章id
    //   article_id: '',
    //   // 文章标题
    //   article_title: '',
    //   // 文章内容
    //   article_content: '',
    //   // marked原文
    //   article_marked_content: '',
    //   // 浏览量
    //   article_views: 0,
    //   // 发表时间
    //   article_date: '',
    //   // 文章点赞数
    //   article_like_count: 1,
    //   // 点赞的ip地址
    //   article_like_ips: [],
    // },
  ],
}).write()


