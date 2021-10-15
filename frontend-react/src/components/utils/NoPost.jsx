import React from 'react'
import nodata from '../../assets/NoData.svg'

const NoPost = ({text}) => {
  return (
    <div className="no-posts-component" >
      <div className="post-image-container">
      <object type="image/svg+xml" data={nodata} >
        Error al cargar svg
      </object>
      <p>{text}</p>
      </div>
    </div>
  )
}

export default NoPost
