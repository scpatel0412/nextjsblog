import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'
import { grpahCMSImageLoader } from '../util'
import { getSimilarPosts, getRecentPosts } from '../services'

const PostWidget = ({ categories, slug, darkMode }: any) => {
  const [relatedPosts, setRelatedPosts] = useState<Array<any>>([])
  const [colored, setColored] = useState<string | null>('')

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result)
      })
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result)
      })
    }
    setColored(darkMode)
  }, [slug, darkMode])
  return (
    <div>
      <div
        className={
          colored === 'light'
            ? 'mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg'
            : 'mb-8 rounded-lg bg-gray-900 p-8 pb-12 shadow-lg'
        }
      >
        <h3
          className={
            colored === 'light'
              ? 'mb-8 border-b pb-4 text-xl font-semibold'
              : 'mb-8 border-b pb-4 text-xl font-semibold text-white'
          }
        >
          {slug ? 'Related Posts' : 'Recent Posts'}
        </h3>
        {relatedPosts.map((post: any, index: any) => {
          return (
            <div key={index} className="mb-4 flex w-full items-center">
              <div className="w-16 flex-none">
                <Image
                  loader={grpahCMSImageLoader}
                  alt="image"
                  height="60px"
                  width="60px"
                  unoptimized
                  className="rounded-full align-middle"
                  src={post.featuredImage.url}
                />
              </div>
              <div
                className={
                  colored === 'light'
                    ? 'ml-4 flex-grow'
                    : 'ml-4 flex-grow text-white'
                }
              >
                <p
                  className={
                    colored === 'light'
                      ? 'font-xs text-gray-500'
                      : 'font-xs text-white'
                  }
                >
                  {moment(post.createdAt).format('MMM DD, YYYY')}
                </p>
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PostWidget
