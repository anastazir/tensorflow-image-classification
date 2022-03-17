/* eslint-disable jsx-a11y/img-redundant-alt */
// eslint-disable-next-line jsx-a11y/img-redundant-alt
import React from           'react'
import { useSelector } from 'react-redux';

const ImageShow = () => {

  const image = useSelector((state) => state.imageReducer.image)

  return (
      <div className="image-container">
        <img
        style={{borderRadius: "6px"}}
          src={image}
          crossOrigin="anonymous"
          alt="Image"
          className="image-shown"
        />
      </div>
  )
}

export default ImageShow
