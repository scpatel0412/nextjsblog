import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategories } from '../services'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

function Header(props: any) {
  const [categories, setCategories] = useState<Array<any>>([])

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories)
    })
  }, [])

  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="inline-block w-full border-b border-blue-400 py-8">
        <div className="block md:float-left">
          <Link href="/">
            <span className="cursor-pointer text-4xl font-bold text-white">
              Travel Blog
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category: any, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
              <span className="ml-4 mt-2 cursor-pointer align-middle font-semibold text-white md:float-right">
                {category.name}
              </span>
            </Link>
          ))}
          <div className="ml-4 mt-2 cursor-pointer align-middle font-semibold text-white md:float-right">
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              checked={props.darkMode !== 'light' ? true : false}
              onChange={() => props.websiteMode()}
            />
            <label htmlFor="checkbox" className="label">
              <FontAwesomeIcon icon={faMoon} style={{ color: 'pink' }} />
              <FontAwesomeIcon icon={faSun} style={{ color: 'yellow' }} />
              <div className="ball" />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
