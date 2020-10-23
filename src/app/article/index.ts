import {createModule, gql} from 'graphql-modules'
import {Article} from './providers/article'
import resolvers from './resolvers'

export const ArticleModule = createModule({
  id: 'article',
  dirname: __dirname,
  providers: [Article],
  resolvers,
  typeDefs: gql`
    extend type Query {
      # 单个文章
      article (id: ID!): Article!
      # 所有文章
      articles: [Article]!
    }

    type Mutation {
      addArticle (input: ArticleInput!): ID!
    }

    type Article {
      # 文章id
      article_id: ID
      # 文章标题
      article_title: String!
      # 文章内容
      article_content: String!
      # marked原文
      article_marked_content: String
      # 浏览量
      article_views: Int
      # 创建文章时间
      article_date: String
      # 创建文章时间戳
      article_time_stamp: Int
      # 文章点赞数
      article_like_count: Int
      # 点赞的ip地址
      article_like_ips: [String!]
      # 背景图地址(/保存至本服务器)
      bg_path: String
      # 是否置顶（放置于首页轮播图）
      is_top: Boolean
      # 置顶权重
      top_weight: Int
      # 标签
      tags: [String]
    }

    input ArticleInput {
       # 验证身份
      key: String!
      # 文章id
      article_id: ID
      # 文章标题
      article_title: String!
      # 文章内容
      article_content: String!
      # marked原文
      article_marked_content: String
      # 背景图地址(/保存至本服务器)
      bg_path: String
      # 是否置顶（放置于首页轮播图）
      is_top: Boolean
      # 置顶权重
      top_weight: Int
      # 标签
      tags: [String]
    }
  `,
})
