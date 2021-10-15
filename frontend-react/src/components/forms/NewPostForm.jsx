import React, { useState } from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { exposures } from '../../helpers/exposures'

const NewPostForm = ({errors, onSubmitCallBack, pTitle="", pContent="", pExposureId=exposures.PUBLIC, pExpirationTime = 60, textButton="Create Post"}) => {
  const [title, setTitle] = useState(pTitle)
  const [content, setContent] = useState(pContent);
  const [expirationTime, setExpirationTime] = useState(pExpirationTime)
  const [exposureId, setExposureId] = useState(pExposureId) 

  const submitForm = (e) =>{
    e.preventDefault();
    onSubmitCallBack({title, content, expirationTime, exposureId })
  }

  return (
    <div>
      <Form onSubmit={submitForm}>
        <Form.Group control="post" >
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={e=> setTitle(e.target.value)} placeholder="Enter your title" isInvalid={errors.title} />
            <Form.Control.Feedback type="invalid" >{errors.title}</Form.Control.Feedback>
        </Form.Group>
        <Row>
          <Col md="6" xs="12" >
            <Form.Group controlId="expirationTime" >
              <Form.Label>Tiempo de expiracion</Form.Label>
              <Form.Control disabled={exposureId == exposures.PRIVATE} as="select" value={expirationTime} onChange={e=>setExpirationTime(e.target.value)} >
                <option value="30" >30 minutos</option>
                <option value="60" >1 hora</option>
                <option value="120" >2 horas</option>
                <option value="360" >6 horas</option>
                <option value="720" >12 horas</option>
                <option value="1440" >1 día</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid" >{errors.expirationTime}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="exposureId" >
              <Form.Label>Tipo de post</Form.Label>
              <div>
              <Form.Label>
                <Form.Check onChange={e=>setExposureId(e.target.value)} checked={exposureId == exposures.PRIVATE} value={exposures.PRIVATE} inline label="Private" name="exposureId" type="radio"
                ></Form.Check>
                </Form.Label>
                <Form.Label>
                <Form.Check onChange={e=>setExposureId(e.target.value)} checked={exposureId == exposures.PUBLIC} value={exposures.PUBLIC} inline label="Public" name="exposureId" type="radio"
                ></Form.Check>
                </Form.Label>
              </div> 
              <Form.Control.Feedback type="invalid" >{errors.exposureId}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group control="post" >
        <Form.Label>Content</Form.Label>
          <Form.Control  rows={10} as="textarea"  value={content}  onChange={e=> setContent(e.target.value)}  placeholder="Enter your content" isInvalid={errors.content} />
            <Form.Control.Feedback type="invalid" >{errors.content}</Form.Control.Feedback>
            </Form.Group >
        <Button className="mt-3" variant="primary" type="submit" >{textButton}</Button>
      </Form>
    </div>
  )
}

export default NewPostForm