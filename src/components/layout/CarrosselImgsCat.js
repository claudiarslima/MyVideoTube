import React, {Component} from 'react';
import $ from 'jquery';
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { Pagination, Navigation } from 'react-id-swiper/lib/ReactIdSwiper.full';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Navbar from '../layout/Navbar.js'


import '../../css/style_carrosselImgs.css';

const CarrosselImgsCat = ({carrosel}) => {



  return(

<div>
  <Carousel autoPlay={true} showArrows={false} infiniteLoop={true} showIndicators={false} showStatus={false} showThumbs={false}	transitionTime={350} interval={3000} style={{position: "relative", top: "-50px"}} >
      <div>
          <img className="d-block w-100 h-100 mt-0" src={carrosel[0].img1.animais1} alt="First slide" style={{width: "100%"}}/>
      </div>
      <div>
          <img className="d-block w-100 h-100" src={carrosel[0].img2.animais2} alt="Second slide" style={{width: "100%"}}/>

      </div>
      <div>
          <img className="d-block w-100 h-100" src={carrosel[0].img3.animais3} alt="Third slide" style={{width: "100%"}}/>
      </div>
      <div>
          <img className="d-block w-100 h-100" src={carrosel[0].img4.animais4} alt="Fourth slide"/>      </div>
  </Carousel>
</div>

  )

};

export default CarrosselImgsCat;
