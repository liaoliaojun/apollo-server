import {Injectable} from 'graphql-modules'
import {generate} from 'shortid'
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
      return new Error ('check password failed')
    }

    const articleInfo = {
      article_id: generate(),
      title: input.title,
      marked_content: input.marked_content,
      content: input.content,
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
}
