import React, { useEffect, useState } from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'
import { Alert, Card, Col, Container, Row } from 'react-bootstrap'
import SignInForm from '../components/forms/SignInForm'
import {useDispatch, useSelector} from 'react-redux'
import validator  from 'validator'
import { isObjectEmpty } from '../helpers/helpers'
import { loginUser } from '../actions/authActions'
import NewPostForm from '../components/forms/NewPostForm'
import { exposures } from '../helpers/exposures'
import axios from 'axios'
import { CREATE_POST_ENDPOINT, POST_DETAILS_ENDPOINT, UPDATE_POST_ENDPOINT } from '../helpers/endpoints'
import {toast} from 'react-toastify'
import { getUserPosts } from '../actions/postsAction'


const EditPost = () => {

  const {id} = useParams()
  const [errors, setErrors] = useState({});
  const history = useHistory()
  const [post, setPost] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get(`${POST_DETAILS_ENDPOINT}/${id}`)
      .then((response) => {
        setPost(response.data)
      })
      .catch((e) => {
        history.push('/')
      })
  }, [])

  const editPost = async ({title,content ,expirationTime , exposureId}) =>{
    const errors = {};
    setErrors(errors);
    if(validator.isEmpty(title)){
      errors.title = "El titulo no puede estar vacío."
    }
    if(validator.isEmpty(content)){
      errors.content = "El contenido no puede estar vacío."
    }
    if(!isObjectEmpty(errors)){
      setErrors(errors);
      return;
    }
    expirationTime = exposureId == exposures.PRIVATE ? 0 : expirationTime;
    console.log();

    try {

      const response = await axios.put(`${UPDATE_POST_ENDPOINT}/${post.postId}`, {title,content ,expirationTime , exposureId} )
      await dispatch(getUserPosts())
      toast.success('¡Post actualizado exitosamente!', {
        position: toast.POSITION.TOP_LEFT ,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
        });
        history.push(`/post/${response.data.postId}`)
    } catch (error) {
      setErrors({createpost: error.response.data.message})
    }

  }

  return (
    <div>
      <Container className="mt-5" >
        <Row>
          <Col sm="12" md={{span:10, offset: 1}} lg = {{span:10, offset:1}} >
            <Card body>
            {errors.createpost && <Alert className="mt-2" variant="danger" >{errors.createpost}</Alert> }
              <h3>Edit Post</h3> <br />
              {post && <NewPostForm textButton="Edit Post" pTitle={post.title} pContent={post.content} pExposureId={post.exposureId} pExpirationTime ={post.expirationTime} errors={errors} onSubmitCallBack={editPost} ></NewPostForm>}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EditPost
