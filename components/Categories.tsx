import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { getCategories } from '../services'

const Categories = () => {
  const [categories, setCategories] = useState<Array<any>>([])

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories)
    })
  }, [])

  return (
    <div>
      <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
        <h3 className="mb-8 border-b pb-4 text-xl font-semibold">Categories</h3>
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
