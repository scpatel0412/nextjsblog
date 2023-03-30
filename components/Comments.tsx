import React, { useEffect, useState } from 'react'
import moment from 'moment'
import parse from 'html-react-parser'

import { getComments } from '../services'

const Comments = ({ slug, darkMode }: any) => {
  const [comments, setComments] = useState([])
  const [colored, setColored] = useState<string | null>('')

  useEffect(() => {
    getComments(slug).then((result) => {
      setComments(result)
    })
    setColored(darkMode)
  }, [darkMode])

  return (
    <>
      {comments.length > 0 && (
        <div
          className={
            colored === 'light'
              ? 'mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg'
              : 'mb-8 rounded-lg bg-gray-900 p-8 pb-12 text-white shadow-lg'
          }
        >
          <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
            {comments.length} Comments
          </h3>
          {comments.map((comment: any, index: any) => (
            <div key={index} className="mb-4 border-b border-gray-100 pb-4">
              <p className="mb-4">
                <span className="font-semibold">{comment.name}</span> on{' '}
                {moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <p
                className={
                  colored === 'light'
                    ? 'w-full whitespace-pre-line text-gray-600'
                    : 'w-full whitespace-pre-line text-white'
                }
              >
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments
