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
      # 置顶文章
      tops: [Article]!
    }

    type Mutation {
      addArticle (input: ArticleInput!): ID!

      updateArticle (input: ArticleInput!): ID!

      deleteArticle (input: DeleteArticleInput!): ID!

      likeArticle (article_id: ID!): Boolean!
    }

    type Article {
      # 文章id
      article_id: ID
      # 文章标题
      title: String!
      # 文章内容
      content: String!
      # marked原文
      marked_content: String
      # 浏览量
      views: Int
      # 创建文章时间
      date: String
      # 创建文章时间戳
      time_stamp: Int
      # 文章点赞数
      like_count: Int
      # 点赞的ip地址
      like_ips: [String!]
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
      title: String!
      # 文章内容
      content: String!
      # marked原文
      marked_content: String
      # 背景图地址(/保存至本服务器)
      bg_path: String
      # 是否置顶（放置于首页轮播图）
      is_top: Boolean
      # 置顶权重
      top_weight: Int
      # 标签
      tags: [String]
    }

    input DeleteArticleInput {
      # 验证身份
      key: String!
      # 文章id
      article_id: ID!
    }
  `,
})
