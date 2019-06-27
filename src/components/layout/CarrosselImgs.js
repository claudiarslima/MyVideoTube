import React, {Component} from 'react';
import films from "../../img/imgs_fundo_carrossel/f_films.jpg";
import tec from "../../img/imgs_fundo_carrossel/f_tec.png";
import mus from "../../img/imgs_fundo_carrossel/f_mus.png";
import animais from "../../img/imgs_fundo_carrossel/f_animais_4.jpg";
import gaming from "../../img/imgs_fundo_carrossel/f_gaming.jpg";
import sports from "../../img/imgs_fundo_carrossel/f_sports.jpg";
import education from "../../img/imgs_fundo_carrossel/f_educacao.jpg";
import news from "../../img/imgs_fundo_carrossel/f_news.jpg";
import $ from 'jquery';
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { Pagination, Navigation } from 'react-id-swiper/lib/ReactIdSwiper.full';

import '../../css/style_carrosselImgs.css';

const CarrosselImgs = () => {
  return(

    <Swiper id="swiper_1" id={1} autoplay={true} speed={1200}>
    <div ><img className="d-block w-100 h-100 mt-0" src={films} alt="First slide"/></div>
    <div><img className="d-block w-100 h-100" src={tec}
           alt="Second slide"/></div>
    <div><img className="d-block w-100 h-100" src={mus}
         alt="Third slide"/></div>
    <div><img className="d-block w-100 h-100" src={animais}
           alt="Fourth slide"/></div>
    <div><img className="d-block w-100 h-100" src={gaming}
           alt="Five slide"/></div>
   <div><img className="d-block w-100 h-100" src={sports}
                  alt="Six slide"/></div>
   <div><img className="d-block w-100 h-100" src={news}
                         alt="Seven slide"/></div>
   <div><img className="d-block w-100 h-100" src={education}
                                alt="Eight slide"/></div>
    </Swiper>

  )
}

export default CarrosselImgs;
