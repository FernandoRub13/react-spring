import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Alert, Card, Col, Container, Row } from 'react-bootstrap'
import SignInForm from '../components/forms/SignInForm'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import { isObjectEmpty } from '../helpers/helpers'
import { loginUser } from '../actions/authActions'

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

  const login = ({ email, password }) => {
    const errors = {}
    setErrors(errors)
    if (!validator.isEmail(email)) {
      errors.email = 'El correo electrónico es inválido.'
    }
    if (validator.isEmpty(password)) {
      errors.password = 'La contraseña no puede ser vacía.'
    }
    if (!isObjectEmpty(errors)) {
      setErrors(errors)
      return
    }

    dispatch(loginUser({ email, password }))
      .then((response) => {})
      .catch((err) => {
        setErrors({
          auth: 'Datos incorrectos. Por favor, revisalos nuevamente.',
        })
      })
  }

  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
            <Card body>
              {errors.auth && (
                <Alert className="mt-2" variant="danger">
                  {errors.auth}
                </Alert>
              )}
              <h3>Log In</h3> <br />
              <SignInForm errors={errors} onSubmitCallBack={login}></SignInForm>
              <div className="mt-4">
                <Link to={'/signup'}>Sign Up</Link>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SignIn
