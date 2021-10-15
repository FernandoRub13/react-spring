import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Alert, Card, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import { isObjectEmpty } from '../helpers/helpers'
import { loginUser, registerUser } from '../actions/authActions'
import SignUpForm from '../components/forms/SignUpForm'

const SignIn = () => {
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const loggedIn = useSelector((state) => state.auth.loggedIn)
  const history = useHistory()
  useEffect(() => {
    if (loggedIn) {
      history.push('/')
    }
  })

  const signup = ({ email, password, firstName, lastName }) => {
    const errors = {}
    setErrors(errors)
    if (!validator.isEmail(email)) {
      errors.email = 'El correo electrónico es inválido.'
    }
    if (!validator.isLength(password, { min: 8, max: 30 })) {
      errors.password = 'La contraseña debe tener de 8 a 30 caracteres.'
    }
    if (validator.isEmpty(password)) {
      errors.password = 'La contraseña no puede ser vacia.'
    }
    if (validator.isEmpty(firstName)) {
      errors.firstName = 'El nombre no puede ser vacío.'
    }
    if (validator.isEmpty(lastName)) {
      errors.lastName = 'El apellido no puede ser vacío.'
    }
    if (!isObjectEmpty(errors)) {
      setErrors(errors)
      return
    }

    dispatch(registerUser({ email, password, firstName, lastName }))
      .then((response) => {
        dispatch(loginUser({ email, password }))
      })
      .catch((err) => {
        setErrors({ registerError: err.response.data.message })
      })
  }

  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
            <Card body>
              {errors.registerError && (
                <Alert className="mt-2" variant="danger">
                  {errors.registerError}
                </Alert>
              )}
              <h3>Sign Up</h3> <br />
              <SignUpForm
                errors={errors}
                onSubmitCallBack={signup}
              ></SignUpForm>
              <div className="mt-4">
                <Link to={'/signin'}>Log in</Link>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SignIn
