import React from 'react'
import { Badge, Card } from 'react-bootstrap'
import {Link, NavLink} from 'react-router-dom'
import moment from 'moment'
import {exposures} from '../../helpers/exposures'
import Button from '@restart/ui/esm/Button'
import DeletePostButton from './buttons/DeletePostButtont'


const Post = ({post, renderControls}) => {
  return (
    <Card className="mb-4" >
      {renderControls &&
       <Card.Header className="d-flex justify-content-between" >
        <div>
          <Badge bg="secondary" className="mx-2">{post.exposure.type}</Badge>
          {post.expired && post.exposure.id === exposures.PUBLIC &&  <Badge style={{backgroundColor: "tomato"}} className="mr-2">Expired</Badge>}
        </div>
        <div>
          <Button as={NavLink} to={`/edit/post/${post.postId}`} className="btn btn-sm btn-primary mx-2"  >Editar</Button>
          <DeletePostButton postId={post.postId} title={post.title} ></DeletePostButton>
        </div>
        </Card.Header>}
      <Card.Body>
        <Card.Title>
          <Link to={`/post/${post.postId}`} >{post.title}</Link>
        </Card.Title>
        <Card.Text>Creado por {post.user.firstName}, {moment(post.createdAt).fromNow()} </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Post
