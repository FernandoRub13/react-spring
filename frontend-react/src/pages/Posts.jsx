import React, { useEffect, useState } from 'react'
import { PUBLIC_POSTS_ENDPOINT } from '../helpers/endpoints'
import axios from 'axios'
import Post from '../components/posts/Post'
import { Container } from 'react-bootstrap'
import Placeholder from '../components/utils/Placeholder'
import NoPost from '../components/utils/NoPost'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    axios
      .get(PUBLIC_POSTS_ENDPOINT)
      .then((response) => {
        setPosts(response.data)
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(setFetching(false))
  }, [])
  return (
    <div>
      <div className="my-5" fluid>
        <Container>
          <h1>Last posts</h1>
        </Container>
      </div>
      {fetching && (
        <>
          {' '}
          <Placeholder /> <Placeholder /> <Placeholder /> <Placeholder />{' '}
          <Placeholder />{' '}
        </>
      )}
      {!fetching && posts.length === 0 && (
        <NoPost text="Aún no hay post públicos" />
      )}
      <div className="">
        {posts.map((post) => (
          <Post key={post.postId} renderControls={false} post={post}></Post>
        ))}
      </div>
    </div>
  )
}

export default Posts
