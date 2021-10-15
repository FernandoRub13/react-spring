import React, { useEffect, useState } from 'react'
import { PUBLIC_POSTS_ENDPOINT } from '../helpers/endpoints'
import axios from 'axios'
import Post from '../components/posts/Post'
import { Container } from 'react-bootstrap'
import Placeholder from '../components/utils/Placeholder'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    axios
      .get(PUBLIC_POSTS_ENDPOINT)
      .then((response) => {
        setPosts(response.data)
        setFetching(false)
      })
      .catch((e) => {
        console.error(e)
        setFetching(false)
      })
  }, [])
  return (
    <div>
      
      <div className="my-5"  fluid  >
        <Container>
          <h1>Last posts</h1>
        </Container>
      </div>
      {fetching ?
      (
       <> 
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </>
      ) 
      :
      (<div className="">
        {posts.map((post) => (
          <Post key={post.postId} renderControls={false} post={post}></Post>
        ))}
      </div>)
      }
    </div>
  )
}

export default Posts
