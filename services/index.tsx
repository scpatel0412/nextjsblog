import axios from 'axios'
import { request, gql } from 'graphql-request'
// require('dotenv').config({ path: '../config.env' })
const graphqlApi: any =
  'https://api-ap-south-1.graphcms.com/v2/cl1g3y72n3q4s01xf0d558gt9/master'

export const getPosts = async () => {
  const query: any = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `
  const result: any = await request(graphqlApi, query)
  return result.postsConnection.edges
}
export const getFeaturedPosts = async () => {
  const query: any = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `
  const result = await request(graphqlApi, query)
  return result.posts
}
export const getAdjacentPosts = async (createdAt: any, slug: any) => {
  const query: any = gql`
    query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlApi, query, { slug, createdAt })
  return { next: result.next[0], previous: result.previous[0] }
}
export const getSimilarPosts = async (categories: any, slug: any) => {
  const query: any = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlApi, query, { slug, categories })

  return result.posts
}
export const getRecentPosts = async () => {
  const query: any = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlApi, query)

  return result.posts
}
export const getCategories = async () => {
  const query: any = gql`
    query GetGategories {
      categories {
        name
        slug
      }
    }
  `

  const result = await request(graphqlApi, query)

  return result.categories
}
export const getCategoryPost = async (slug: any) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlApi, query, { slug })

  return result.postsConnection.edges
}
export const getPostDetails = async (slug: any) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `

  const result = await request(graphqlApi, query, { slug })

  return result.post
}
export const submitComment = async (obj: any) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
  return result.json()
}

export const getComments = async (slug: any) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `

  const result = await request(graphqlApi, query, { slug })

  return result.comments
}
