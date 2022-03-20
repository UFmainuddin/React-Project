import React from 'react'
import {Carousel} from 'react-bootstrap';

const ImageSlider = ({images}) => {

  return (
        <Carousel>
    {images.map((img, index) => (<Carousel.Item key={index}>
    <img
      className="d-block w-100"
      src={img}
      alt="First slide"
    />
  </Carousel.Item>))}
   
  </Carousel>
  )
}


export default ImageSlider

