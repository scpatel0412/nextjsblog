import React from 'react'
import { useRouter } from 'next/router'

import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  // Loader,
} from '../../components/index'
import { getPosts, getPostDetails } from '../../services'
import { AdjacentPosts } from '../../sections'

const PostDetails = (props: any) => {
  const router = useRouter()

  if (router.isFallback) {
    return false
  }

  return (
    <>
      <div className="container mx-auto mb-8 px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={props.post} darkMode={props.darkMode} />
            <Author author={props.post.author} />
            <AdjacentPosts
              slug={props.post.slug}
              createdAt={props.post.createdAt}
            />
            <CommentsForm slug={props.post.slug} darkMode={props.darkMode} />
            <Comments slug={props.post.slug} darkMode={props.darkMode} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative top-8 lg:sticky">
              <PostWidget
                slug={props.post.slug}
                categories={props.post.categories.map(
                  (category: any) => category.slug
                )}
                darkMode={props.darkMode}
              />
              <Categories darkMode={props.darkMode} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default PostDetails

// Fetch data at build time
export async function getStaticProps({ params }: any) {
  const data = await getPostDetails(params.slug)
  return {
    props: {
      post: data,
    },
  }
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const posts = await getPosts()
  return {
    paths: posts.map(({ node: { slug } }: any) => ({ params: { slug } })),
    fallback: true,
  }
}
