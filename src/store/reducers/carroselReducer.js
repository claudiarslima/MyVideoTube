import animals1 from '../../img/imgs_fundo_carrossel/f_animais.jpg';
import animals2 from '../../img/imgs_fundo_carrossel/f_animais1.jpg';
import animals3 from '../../img/imgs_fundo_carrossel/f_animais2.jpg';
import tech1 from '../../img/imgs_vid_cat/tech1.jpg';
import tech2 from '../../img/imgs_vid_cat/tech2.jpg';
import tech3 from '../../img/imgs_vid_cat/tech3.jpg';
import music1 from '../../img/imgs_vid_cat/music1.jpg';
import music2 from '../../img/imgs_vid_cat/music2.jpg';
import music3 from '../../img/imgs_vid_cat/music3.jpg';
import tv1 from '../../img/imgs_vid_cat/tv1.jpg';
import tv2 from '../../img/imgs_vid_cat/tv2.png';
import tv3 from '../../img/imgs_vid_cat/tv3.jpg';
import auto1 from '../../img/imgs_vid_cat/auto1.jpg';
import auto2 from '../../img/imgs_vid_cat/auto2.jpg';
import auto3 from '../../img/imgs_vid_cat/auto3.jpg';
import lifestyle1 from '../../img/imgs_vid_cat/lifestyle1.jpg';
import lifestyle2 from '../../img/imgs_vid_cat/lifestyle2.jpg';
import lifestyle3 from '../../img/imgs_vid_cat/lifestyle3.jpg';
import comedy1 from '../../img/imgs_vid_cat/comedy1.jpg';
import comedy2 from '../../img/imgs_vid_cat/comedy2.jpg';
import comedy3 from '../../img/imgs_vid_cat/comedy3.jpg';
import entertainment1 from '../../img/imgs_vid_cat/entertainment1.jpg';
import entertainment2 from '../../img/imgs_vid_cat/entertainment2.jpg';
import entertainment3 from '../../img/imgs_vid_cat/entertainment3.jpg';
import animation1 from '../../img/imgs_vid_cat/animation1.jpg';
import animation2 from '../../img/imgs_vid_cat/animation2.jpg';
import animation3 from '../../img/imgs_vid_cat/animation3.jpg';
import sport1 from '../../img/imgs_vid_cat/sport1.jpg';
import sport2 from '../../img/imgs_vid_cat/sport2.jpg';
import sport3 from '../../img/imgs_vid_cat/sport3.jpg';
import travel1 from '../../img/imgs_vid_cat/travel1.jpg';
import travel2 from '../../img/imgs_vid_cat/travel2.jpg';
import travel3 from '../../img/imgs_vid_cat/travel3.jpg';
import movies1 from '../../img/imgs_vid_cat/movies1.jpg';
import movies2 from '../../img/imgs_vid_cat/movies2.jpg';
import movies3 from '../../img/imgs_vid_cat/movies3.jpg';
import games1 from '../../img/imgs_vid_cat/games1.jpg';
import games2 from '../../img/imgs_vid_cat/games2.jpg';
import games3 from '../../img/imgs_vid_cat/games3.jpg';
import blog1 from '../../img/imgs_vid_cat/blog1.jpg';
import blog2 from '../../img/imgs_vid_cat/blog2.jpg';
import blog3 from '../../img/imgs_vid_cat/blog3.jpg';
import news1 from '../../img/imgs_vid_cat/news1.jpg';
import news2 from '../../img/imgs_vid_cat/news2.jpg';
import news3 from '../../img/imgs_vid_cat/news3.jpg';
import education1 from '../../img/imgs_vid_cat/education1.jpg';
import education2 from '../../img/imgs_vid_cat/education2.jpg';
import education3 from '../../img/imgs_vid_cat/education3.jpg';
import family1 from '../../img/imgs_vid_cat/family1.jpg';
import family2 from '../../img/imgs_vid_cat/family2.jpg';
import family3 from '../../img/imgs_vid_cat/family3.jpg';
import action1 from '../../img/imgs_vid_cat/action1.jpg';
import action2 from '../../img/imgs_vid_cat/action2.jpg';
import action3 from '../../img/imgs_vid_cat/action3.jpg';
import documentary1 from '../../img/imgs_vid_cat/documentary1.jpg';
import documentary2 from '../../img/imgs_vid_cat/documentary2.jpg';
import documentary3 from '../../img/imgs_vid_cat/documentary3.jpg';
import beauty1 from '../../img/imgs_vid_cat/beauty1.jpg';
import beauty2 from '../../img/imgs_vid_cat/beauty2.jpg';
import beauty3 from '../../img/imgs_vid_cat/beauty3.jpg';
import food1 from '../../img/imgs_vid_cat/food1.jpg';
import food2 from '../../img/imgs_vid_cat/food2.jpg';
import food3 from '../../img/imgs_vid_cat/food3.jpg';

const initState = {
      img: [
        {animals1: {animals1}, animals2: {animals2}, animals3: {animals3}},                                           //0
        {tech1: {tech1}, tech2: {tech2}, tech3:{tech3}},                                                             //1
        {music1: {music1}, music2: {music2}, music3: {music3}}, //2
        {lifestyle1: {lifestyle1}, lifestyle2: {lifestyle2}, lifestyle3: {lifestyle3}},//3
        {comedy1: {comedy1}, comedy2: {comedy2}, comedy3: {comedy3}}, //4
        {entertainment1: {entertainment1}, entertainment2: {entertainment2}, entertainment3: {entertainment3}}, //5
        {animation1: {animation1}, animation2: {animation2}, animation3: {animation3}}, //6
        {sport1: {sport1}, sport2: {sport2}, sport3: {sport3}}, //7
        {travel1: {travel1}, travel2: {travel2}, travel3: {travel3}}, //8
        {movies1: {movies1}, movies2: {movies2}, movies3: {movies3}}, //9
        {games1: {games1}, games2: {games2}, games3: {games3}}, //10
        {tv1: {tv1}, tv2: {tv2}, tv3: {tv3}}, //11
        {auto1: {auto1}, auto2: {auto2}, auto3: {auto3}}, //12
        {blog1: {blog1}, blog2: {blog2}, blog3: {blog3}}, //13
        {news1: {news1}, news2: {news2}, news3: {news3}}, //14
        {education1: {education1}, education2: {education2}, education3: {education3}}, //15
        {family1: {family1}, family2: {family2}, family3: {family3}}, //16
        {action1: {action1}, action2: {action2}, action3: {action3}}, //17
        {documentary1: {documentary1}, documentary2: {documentary2}, documentary3: {documentary3}}, //18
        {beauty1: {beauty1}, beauty2: {beauty2}, beauty3: {beauty3}}, //19
        {food1: {food1}, food2: {food2}, food3: {food3}} //20
      ]

}

const carroselReducer = (state = initState, action) => {
  return state;
}

export default carroselReducer;
