import Button from '@restart/ui/esm/Button'
import axios from 'axios'
import React from 'react'
import {confirmAlert} from 'react-confirm-alert'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getUserPosts } from '../../../actions/postsAction'
import { DELETE_POST_ENDPOINT } from '../../../helpers/endpoints'

const DeletePostButton = ({postId, title}) => {
  const dispatch = useDispatch()
  const createAlert = ()=>{
    confirmAlert({
      title: "Eliminar post",
      message: `¿Estas seguro que deseas eliminar el post ${title}?`,
      buttons: [
        {
        label: "Yes",
        onClick: () =>{deletePost()}
      },
        {
        label: "No",
        onClick: () =>{return false}
      },
    ]
    })
  }
  const deletePost = async ()=>{
    try {
      await axios.delete(`${DELETE_POST_ENDPOINT}/${postId}`)
    await dispatch(getUserPosts())
    toast.success('¡Post eliminado exitosamente!', {
      position: toast.POSITION.TOP_LEFT ,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_LEFT ,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
        });
    }
  }
  return (
    <Button 
    onClick={createAlert}
    className="btn btn-sm btn-primary"   >Elimar</Button>
  )
}

export default DeletePostButton
