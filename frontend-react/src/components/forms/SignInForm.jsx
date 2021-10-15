import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'

const SignInForm = ({errors, onSubmitCallBack}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const submitForm = (e) =>{
    e.preventDefault();
    onSubmitCallBack({email, password})
  }

  return (
    <div>
      <Form onSubmit={submitForm}>
        <Form.Group control="email" >

          <Form.Label>Email</Form.Label>
          <Form.Control type="text" value={email} onChange={e=> setEmail(e.target.value)} placeholder="Enter your email" isInvalid={errors.email} />
            <Form.Control.Feedback type="invalid" >{errors.email}</Form.Control.Feedback>

            <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e=> setPassword(e.target.value)} placeholder="Enter your password" isInvalid={errors.password} />
            <Form.Control.Feedback type="invalid" >{errors.password}</Form.Control.Feedback>

        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit" >Sign In</Button>
      </Form>
    </div>
  )
}

export default SignInForm