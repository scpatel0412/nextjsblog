import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'
import { grpahCMSImageLoader } from '../util'
interface PostCardProps {
  post: any
  darkMode: any
}

const PostCard = ({ post, darkMode }: PostCardProps) => {
  const [colored, setColored] = useState<string | null>('')
  useEffect(() => {
    setColored(darkMode)
  }, [darkMode])
  return (
    <div>
      <div
        className={
          colored === 'light'
            ? 'mb-8 rounded-lg bg-white p-0 pb-12 shadow-lg lg:p-8'
            : 'mb-8 rounded-lg bg-gray-900  p-0 pb-12 shadow-lg lg:p-8'
        }
      >
        <div className="relative mb-6 overflow-hidden pb-80 shadow-md">
          <img
            src={post.node.featuredImage.url}
            alt=""
            className="absolute h-80 w-full rounded-t-lg object-cover  object-top shadow-lg lg:rounded-lg"
          />
        </div>

        <h1
          className={
            colored === 'light'
              ? 'mb-8 cursor-pointer text-center text-3xl font-semibold transition duration-700 hover:text-pink-600'
              : 'mb-8 cursor-pointer text-center text-3xl font-semibold text-white transition duration-700 hover:text-pink-600'
          }
        >
          <Link href={`/post/${post.node.slug}`}>{post.node.title}</Link>
        </h1>
        <div className="mb-8 block w-full items-center justify-center text-center lg:flex">
          <div className="mb-4 mr-8 flex w-full items-center items-center justify-center lg:mb-0 lg:w-auto">
            <Image
              unoptimized
              loader={grpahCMSImageLoader}
              alt={post.node.author.name}
              height="30px"
              width="30px"
              className="rounded-full align-middle"
              src={post.node.author.photo.url}
            />
            <p
              className={
                colored === 'light'
                  ? 'ml-2 inline align-middle text-lg font-medium text-gray-700'
                  : 'ml-2 inline align-middle text-lg font-medium text-white'
              }
            >
              {post.node.author.name}
            </p>
          </div>
          <div
            className={
              colored === 'light'
                ? 'font-medium text-gray-700'
                : 'font-medium text-white'
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 inline h-6 w-6 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="align-middle">
              {moment(post.node.createdAt).format('MMM DD, YYYY')}
            </span>
          </div>
        </div>
        <p
          className={
            colored === 'light'
              ? 'mb-8 px-4 text-center text-lg font-normal text-gray-700 lg:px-20'
              : 'mb-8 px-4 text-center text-lg font-normal text-white lg:px-20'
          }
        >
          {post.node.excerpt}
        </p>
        <div className="text-center">
          <Link href={`/post/${post.node.slug}`}>
            <span className="ease inline-block transform cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg font-medium text-white transition duration-500 hover:-translate-y-1">
              Continue Reading
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PostCard
