import React, { useEffect, useState } from 'react'
import Post from '../components/posts/Post'
import { Container } from 'react-bootstrap'
import Placeholder from '../components/utils/Placeholder'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getUserPosts } from '../actions/postsAction'
import NoPost from '../components/utils/NoPost'

const UserPosts = () => {
  const [fetching, setFetching] = useState(true)
  const fetched = useSelector((state) => state.posts.fetched)
  const posts = useSelector((state) => state.posts.posts)
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchedPosts() {
      if (!fetched) {
        try {
          setFetching(true)
          await dispatch(getUserPosts())
          //De: ************************************************************************************************>
          // fetchedPosts()
          //De: ************************************************************************************************>
        } catch (error) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 2000,
          })
        }
      }
    }
    // A: ************************************************************************************************<
    fetchedPosts()
    // A: ************************************************************************************************<
    setFetching(false)
  }, [fetched, dispatch])
  return (
    <div>
      <div className="my-5" fluid>
        <Container>
          <h1>My posts</h1>
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
        <NoPost text="Aún no publicas ningún post." />
      )}
      <div className="">
        {posts.map((post) => (
          <Post key={post.postId} renderControls={true} post={post}></Post>
        ))}
      </div>
    </div>
  )
}

export default UserPosts
