import Lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import mkdirp from 'mkdirp'

import {resolve} from 'path'

mkdirp(resolve(__dirname, '../../live'), function (err) {
  console.log(err)
})

export const db = new Lowdb(new FileSync(resolve(__dirname, '../../live/db.json')))

db.defaults({
  owner: {
    author: '了了君',
    email: '1030219089a@gamil.com',
    website: 'https://liaoliaojun.com',
  },
  articles: [
    {
      // 文章id
      article_id: '',
      // 文章标题
      article_title: '',
      // 文章内容
      article_content: '',
      // 浏览量
      article_views: 0,
      // 发表时间
      article_date: '',
      // 文章点赞数
      article_like_count: 1,
      // 点赞的ip地址
      article_like_ips: [],
    },
  ],
  uploads: [],
}).write()


