import {Injectable} from 'graphql-modules'
import {generate} from 'shortid'
import DOMPurify from 'dompurify'
import {JSDOM} from 'jsdom'

import {db} from '../../../db/'
import checkKey from '../../../utils/key'


@Injectable()
export class Article {
  // constructor (private)
  getArticle (id: string) {
    return db.get('articles').find({article_id: id}).value()
  }

  getAll () {
    return db.get('articles').value()
  }

  getTops () {
    const articles = this.getAll().filter(article => article.is_top)
    return articles.reduce((acc, cur) => {
      const findIndex = acc.findIndex(item => item.top_weight > cur.top_weight)
      if (findIndex === 0) {
        return [cur, ...acc]
      } else if (findIndex !== -1) {
        return [...acc.slice(0, findIndex), cur, ...acc.slice(findIndex, acc.length)]
      }
      return [...acc, cur]
    }, [])
  }

  addArticle (input) {
    if (!checkKey(input.key)) {
      return new Error ('addArticle check password failed')
    }
    // prevent xss attack
    const {window} = new JSDOM('<!DOCTYPE html>')
    const domPurify = DOMPurify(window)

    const articleInfo = {
      article_id: generate(),
      title: input.title,
      marked_content: input.marked_content,
      content: domPurify.sanitize(input.content),
      views: 1,
      date: '20201001 12:38',
      time_stamp: new Date().getTime(),
      like_count: 0,
      like_ips: [],
      bg_path: input.bg_path,
      is_top: input.is_top,
      top_weight: input.top_weight,
      tags: input.tags || [],
    }
    db.get('articles').unshift(articleInfo).write()
    return articleInfo.article_id
  }

  updateArticle (input) {
    if (!checkKey(input.key)) {
      return new Error ('updateArticle check password failed')
    }
    // check article be existing
    if (!db.get('articles').find({article_id: input.article_id}).value()) {
      return new Error ('not be existing article_id')
    }
    // prevent xss attack
    const {window} = new JSDOM('<!DOCTYPE html>')
    const domPurify = DOMPurify(window)

    db.get('articles').find({article_id: input.article_id}).assign({
      title: input.title,
      marked_content: input.marked_content,
      content: domPurify.sanitize(input.content),
      bg_path: input.bg_path,
      is_top: input.is_top,
      top_weight: input.top_weight,
      tags: input.tags || [],
    }).write()
    return input.article_id
  }

  deleteArticle (input) {
    if (!checkKey(input.key)) {
      return new Error ('deleteArticle check password failed')
    }

    // check article be existing
    if (!db.get('articles').find({article_id: input.article_id}).value()) {
      return new Error ('not be existing article_id')
    }

    db.get('articles').remove({article_id: input.article_id}).write()
    return input.article_id
  }

  likeArticle (article_id, ip) {
    const article = db.get('articles').find({article_id}).cloneDeep().value()
    const ips = article.like_ips || []

    if (ips.indexOf(ip) === -1) {
      // save liked of ip
      ips.unshift(ip)
      db.get('articles').find({article_id}).assign({
        like_count: article.like_count + 1,
        like_ips: ips,
      }).write()
      return true
    } else {
      return false
    }
  }
}
