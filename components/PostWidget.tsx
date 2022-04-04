import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'
import { grpahCMSImageLoader } from '../util'
import { getSimilarPosts, getRecentPosts } from '../services'

const PostWidget = ({ categories, slug }: any) => {
  const [relatedPosts, setRelatedPosts] = useState<Array<any>>([])

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
  }, [slug])
  return (
    <div>
      <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
        <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
          {slug ? 'Related Posts' : 'Recent Posts'}
        </h3>
        {relatedPosts.map((post: any, index: any) => {
          console.log('hello3', post)
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
              <div className="ml-4 flex-grow">
                <p className="font-xs text-gray-500">
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
