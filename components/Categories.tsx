import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { getCategories } from '../services'

const Categories = ({ darkMode }: any) => {
  const [categories, setCategories] = useState<Array<any>>([])
  const [colored, setColored] = useState<string | null>('')

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories)
    })
    setColored(darkMode)
  }, [darkMode])

  return (
    <div>
      <div
        className={
          colored === 'light'
            ? 'mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg'
            : 'mb-8 rounded-lg bg-gray-900 p-8 pb-12 text-white shadow-lg'
        }
      >
        <h3
          className={
            colored === 'light'
              ? 'mb-8 border-b pb-4 text-xl font-semibold'
              : 'mb-8 border-b pb-4 text-xl font-semibold text-white'
          }
        >
          Categories
        </h3>
        {categories.map((category: any, index: any) => (
          <Link key={index} href={`/category/${category.slug}`}>
            <span
              className={`block cursor-pointer ${
                index === categories.length - 1 ? 'border-b-0' : 'border-b'
              } mb-3 pb-3`}
            >
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories
