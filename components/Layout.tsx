import React, { useEffect, useState } from 'react'
import Header from './Header'
const Layout = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState<string | null>(
    (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('mode')) ||
      'light'
  )
  useEffect(() => {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('mode', darkMode as any)
    }
  }, [darkMode])

  function websiteMode(): void {
    if (typeof sessionStorage !== 'undefined') {
      const a = sessionStorage.getItem('mode')
      if (darkMode !== 'dark') {
        // sessionStorage.setItem('mode', 'dark')
        setDarkMode('dark')
      } else {
        setDarkMode('light')
      }
    }
  }

  return (
    <>
      <Header darkMode={darkMode} websiteMode={websiteMode} />
      {React.cloneElement(children, {
        darkMode: darkMode,
        websiteMode: websiteMode,
      })}
    </>
  )
}

export default Layout
