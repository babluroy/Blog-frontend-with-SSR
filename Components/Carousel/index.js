import React, { Fragment } from 'react'
import Link from 'next/link';
import styles from './index.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { url_constants } from '../../utils/routerLink_constants';

export default function CarouselComp( { caraouselBlogs } ) {
  return (
    <Carousel autoFocus={true} dynamicHeight={true} showThumbs={false} className={styles.carouselContainer}>
      {caraouselBlogs.map((data, index) => (
      <Fragment key={index}>
       <Link href={url_constants.blog + data._id}>
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
      </Link>
      </Fragment>
      ))}
    </Carousel>
  );
}
