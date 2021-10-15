import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Container, Spinner } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import { POST_DETAILS_ENDPOINT } from '../helpers/endpoints'
import { Prism } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import { downloadTextAsFile } from '../helpers/helpers'

const PostDetails = () => {
  const { id } = useParams()
  const history = useHistory()
  const [post, setPost] = useState(null)
  const target = useRef(null)

  useEffect(() => {
    axios
      .get(`${POST_DETAILS_ENDPOINT}/${id}`)
      .then((response) => {
        setPost(response.data)
      })
      .catch((e) => {
        history.push('/')
      })
  }, [id, history])
  return (
    <Container>
      {post ? (
        <>
          <div className="my-5">
            <h1>{post.title}</h1>
            <p>
              Creado por {post.user.firstName},{' '}
              {moment(post.createdAt).fromNow()}{' '}
            </p>
          </div>

          <Card>
            <Card.Header>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  downloadTextAsFile(post.title, post.content)
                }}
              >
                Descargar
              </Button>

              <CopyToClipboard
                children
                onCopy={() => {
                  toast.success('Copiado', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                  })
                }}
                text={post.content}
              >
                <Button
                  ref={target}
                  className="mx-2"
                  variant="primary"
                  size="sm"
                >
                  Copiar
                </Button>
              </CopyToClipboard>
            </Card.Header>
            <Card.Body>
              <Prism language="javascript" style={darcula} showLineNumbers>
                {post.content}
              </Prism>
            </Card.Body>
          </Card>
        </>
      ) : (
        <div style={{ marginLeft: '45vw', marginTop: '45vh' }}>
          <Spinner animation="border" variant="dark" /> <span> Loading...</span>
        </div>
      )}
    </Container>
  )
}

export default PostDetails
