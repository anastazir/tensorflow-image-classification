/* eslint-disable jsx-a11y/img-redundant-alt */
// eslint-disable-next-line jsx-a11y/img-redundant-alt
import React from 'react'

const ImageShow = ({img}) => {

    const image='https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw5fHxjb3JnaXxlbnwwfHx8fDE2MzIzMDA1OTg&ixlib=rb-1.2.1&q=80&w=1080'
    return (
        <div>
            <div className="">
        <img
        style={{borderRadius: "6px"}}
          src={img ? img :  image}
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
