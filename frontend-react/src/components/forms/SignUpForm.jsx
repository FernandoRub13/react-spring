import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

const SignUpForm = ({ errors, onSubmitCallBack }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const submitForm = (e) => {
    e.preventDefault()
    onSubmitCallBack({ email, password, firstName, lastName })
  }

  return (
    <div>
      <Form onSubmit={submitForm}>
        <Form.Group control="email">
          <Row>
            <Col md="6" sx="12">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                isInvalid={errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Col>
            <Col md="6" sx="12">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                isInvalid={errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>

          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  )
}

export default SignUpForm
