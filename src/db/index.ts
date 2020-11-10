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
  articles: [],
}).write()
