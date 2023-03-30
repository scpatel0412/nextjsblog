import type { NextPage } from 'next'
import Head from 'next/head'
import { PostCard, Categories, PostWidget } from '../components/'
import { FeaturedPosts } from '../sections'
import { getPosts } from '../services/index'

const Home: NextPage = (props: any) => {
  return (
    <div className="bg-gray container mx-auto mb-8 px-10">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <script
          src="https://kit.fontawesome.com/0a4be8fd79.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {props.posts.map((i: any) => {
            return <PostCard post={i} darkMode={props.darkMode} />
          })}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget darkMode={props.darkMode} />
            <Categories darkMode={props.darkMode} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
export async function getStaticProps() {
  const posts = (await getPosts()) || []
  return {
    props: { posts },
  }
}
