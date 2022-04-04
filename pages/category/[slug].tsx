import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getCategories, getCategoryPost } from '../../services/index'
import { PostCard, Categories } from '../../components/index'

const CategoryPost = ({ posts }: any) => {
  const router = useRouter()
  if (router.isFallback) {
    return false
  }
  return (
    <div className="conatiner mx-auto mb-8 px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post: any, index: any) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPost

export async function getStaticProps({ params }: any) {
  const posts = await getCategoryPost(params.slug)

  return {
    props: { posts },
  }
}

export async function getStaticPaths() {
  const categories = await getCategories()
  return {
    paths: categories.map(({ slug }: any) => ({ params: { slug } })),
    fallback: true,
  }
}
