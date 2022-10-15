import React, { Fragment } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function CarouselComp( { caraouselBlogs } ) {
  return (
    <Carousel autoFocus={true} dynamicHeight={true} showThumbs={false}>
      {caraouselBlogs.map((data, index) => (
      <div key={index}>
        <img src={data.image} alt={data.title}  style={
        {
          width: "100%",
          objectFit: "cover",
          height: "80vh",
        }
      }/>
        <p className="legend">{data.title}</p>
      </div>
      ))}
    </Carousel>
  );
}
