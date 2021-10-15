import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { Alert, Card, Col, Container, Row } from 'react-bootstrap'
import SignInForm from '../components/forms/SignInForm'
import {useDispatch, useSelector} from 'react-redux'
import validator  from 'validator'
import { isObjectEmpty } from '../helpers/helpers'
import { loginUser } from '../actions/authActions'
import NewPostForm from '../components/forms/NewPostForm'
import { exposures } from '../helpers/exposures'
import axios from 'axios'
import { CREATE_POST_ENDPOINT } from '../helpers/endpoints'
import {toast} from 'react-toastify'
import { getUserPosts } from '../actions/postsAction'


const NewPost = () => {

  const [errors, setErrors] = useState({});
  const history = useHistory()
  const dispatch = useDispatch()

  const createPost = async ({title,content ,expirationTime , exposureId}) =>{
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

      const response = await axios.post(CREATE_POST_ENDPOINT, {title,content ,expirationTime , exposureId} )
      await dispatch(getUserPosts())
      toast.success('¡Post creado exitosamente!', {
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
      setErrors({newposts: error.response.data.message})
    }

  }

  return (
    <div>
      <Container className="mt-5" >
        <Row>
          <Col sm="12" md={{span:10, offset: 1}} lg = {{span:10, offset:1}} >
            <Card body>
            {errors.newposts && <Alert className="mt-2" variant="danger" >{errors.newposts}</Alert> }
              <h3>Create Post</h3> <br />
              <NewPostForm errors={errors} onSubmitCallBack={createPost} ></NewPostForm>
              
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NewPost
