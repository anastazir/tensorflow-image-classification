/* eslint-disable jsx-a11y/img-redundant-alt */
// eslint-disable-next-line jsx-a11y/img-redundant-alt
import React from 'react'

const ImageShow = () => {
    const image='https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE2MjI1Nn0'
    return (
        <div>
            <div className="">
        <img
          src={image}
        //   width="400"
          crossOrigin="anonymous"
          alt="Image"
          className="image-shown"
          
        //   ref={imageRef}
        />
        {/* <div className="">

          <button
            className=""
            onClick={() => console.log('clicking')}>sadfasdfasd
          </button>
        </div> */}
        
      </div>
        </div>
    )
}

export default ImageShow
