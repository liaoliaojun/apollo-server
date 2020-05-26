
import {createHash} from 'crypto'
import {generate} from 'shortid'
import {JSDOM} from 'jsdom'
import DOMPurify  from 'dompurify'

// 防xss攻击
const {window} = new JSDOM('<!DOCTYPE html>')
const domPurify = DOMPurify(window)

const PASSWORD_MD5 = 'f40a80dc6e7aa63c2ade7f06eee4c088'

const resolvers = {
  Query: {
    owner: (root, args, {db}) => {
      return db.get('owner').value()
    },
    articles: (root, args, {db}) => {
      return db.get('articles').value()
    },
    article: (root, {article_id}, {db, ip}) => {
      return db.get('articles').find({article_id}).value()
    },
  },

  Mutation: {
    setVisitor: (root, args, {db, ip}) => {
      const visitor = db.get('visitors').find({ip}).value()
      const date = new Date()
      if (!visitor) {
        db.get('visitors').push({ip, visit_time_local: date.toLocaleString('zh-CN'), visit_time_stamp: date.getTime()}).write()
      } else {
        db.get('visitors').find({ip}).assign({visit_time_local: date.toLocaleString('zh-CN'), visit_time_stamp: date.getTime()}).write()
      }
      return true
    },
    addArticle: (root, {input}, {db}) => {
      // 验证密码
      if (createHash('md5').update(input.key).update('liaoliaojun').digest('hex') !== PASSWORD_MD5) return 0
      const articleInfo = {
        article_id: generate(),
        article_title: input.article_title,
        article_marked_content: input.article_marked_content,
        article_content: domPurify.sanitize(input.article_content),
        article_views: 0,
        article_date: '2020.05.21',
        article_like_count: 0,
        article_like_ips: [],
      }
      db.get('articles').push(articleInfo).write()
      return articleInfo.article_id || 0
    },

    updateArticle: (root, {input}, {db}) => {
      // 验证密码
      if (createHash('md5').update(input.key).update('liaoliaojun').digest('hex') !== PASSWORD_MD5) return 0
      // 验证文章是否存在
      if (!db.get('articles').find({article_id: input.article_id}).value()) return 0

      db.get('articles').find({article_id: input.article_id}).assign({
        article_title: input.article_title,
        article_marked_content: input.article_marked_content,
        article_content: domPurify.sanitize(input.article_content),
      }).write()
      return input.article_id || 0
    },

    addArticleLike: (root, {article_id}, {db, ip}) => {
      const article = db.get('articles').find({article_id}).cloneDeep().value()
      const ips = article.article_like_ips || []
      const likeCount = article.article_like_count + 1

      if (ips.indexOf(ip) === -1) {
        // 记录点赞的ip
        ips.push(ip)
      }

      db.get('articles').find({article_id}).assign({
        article_like_count: likeCount,
        article_like_ips: ips,
      }).write()
      return likeCount || 0
    },
  },
}

export default resolvers
