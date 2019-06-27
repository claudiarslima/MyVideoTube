import React from 'react';
import { connect } from 'react-redux';
import films from "../../img/imgs_cat/filmes_cat.jpg";
import tec from "../../img/imgs_cat/tec_cat.jpg";
import music from "../../img/imgs_cat/musica_cat.jpg";
import animals from "../../img/imgs_cat/animais_catt.jpg";
import gaming from "../../img/imgs_cat/gaming_cat.jpg";
import sports from "../../img/imgs_cat/desporto_cat.jpg";
import education from "../../img/imgs_cat/educacao_cat.jpg";
import tv from "../../img/imgs_cat/tv_cat.jpg";
import life from "../../img/imgs_cat/lifestyle_cat.jpg";
import comed from "../../img/imgs_cat/comedia_cat.jpg";
import blog from "../../img/imgs_cat/blog_cat.jpg";
import auto from "../../img/imgs_cat/auto_cat.jpg";
import news from "../../img/imgs_cat/news_cat.jpg";
import animacao from "../../img/imgs_cat/animacao.jpg";
import travel from "../../img/imgs_cat/viagens_cat.jpg";
import ent from "../../img/imgs_cat/entertenimento_cat.jpg";
import fam from "../../img/imgs_cat/familia_cat.jpg";
import acao from "../../img/imgs_cat/ação_cat.jpg";
import beauty from "../../img/imgs_cat/beleza_cat.jpg";
import doc from "../../img/imgs_cat/documentario.jpg";
import food from "../../img/imgs_cat/comida_cat.jpg";



const Categorias = () => {
   // const { carrosel } = this.props;



return (
    <div>
        <div id="catDiv" className="display-desktop">
            <div className="mt-3" style={{marginLeft: "1.5rem", textAlign: "left"}}>
                <h4 style={{color: "white"}}>Categories</h4>
                <hr style={{backgroundImage: "linear-gradient(90deg, #801336, transparent)", border: 0, height: "1px"}}/>
            </div>
            <a className="cat catOverlay" href="technology">
                <img className="img_cat" src={tec}/>
                    <div className="catTitle">Technology</div>
            </a>

            <a className="cat catOverlay" href="music">
                <img className="img_cat" src={music}/>
                    <div className="catTitle">Music</div>
            </a>

            <a className="cat catOverlay" href="tv">
                <img className="img_cat"  src={tv}/>
                    <div className="catTitle">TV</div>
            </a>

            <a className="cat catOverlay"  href="auto">
                <img className="img_cat"  src={auto}/>
                    <div className="catTitle">Auto</div>
            </a>

            <a className="cat catOverlay" href="blogs">
                <img className="img_cat"  src={blog}/>
                    <div className="catTitle">Blogs</div>
            </a>

            <a className="cat catOverlay" href="lifestyle">
                <img className="img_cat"  src={life}/>
                    <div className="catTitle">Lifestyle</div>
            </a>

            <a className="cat catOverlay" href="comedy">
                <img className="img_cat"  src={comed}/>
                    <div className="catTitle">Comedy</div>
            </a>

            <a className="cat catOverlay" href="entertainment">
                <img className="img_cat"  src={ent}/>
                    <div className="catTitle">Entertaiment</div>
            </a>

            <a className="cat catOverlay" href="news">
                <img className="img_cat"  src={news}/>
                    <div className="catTitle">News</div>
            </a>

            <a className="cat catOverlay" href="education">
                <img className="img_cat" src={education}/>
                    <div className="catTitle">Education</div>
            </a>

            <a className="cat catOverlay" href="animation">
                <img className="img_cat"  src={animacao}/>
                    <div className="catTitle">Animation</div>
            </a>

            <a className="cat catOverlay" href="sports">
                <img className="img_cat"  src={sports}/>
                    <div className="catTitle">Sport</div>
            </a>

            <a className="cat catOverlay" href="animals">
                <img className="img_cat"  src={animals}/>
                    <div className="catTitle">Animals</div>
            </a>

            <a className="cat catOverlay" href="family">
                <img className="img_cat"  src={fam}/>
                    <div className="catTitle">Family</div>
            </a>

            <a className="cat catOverlay" href="trips">
                <img className="img_cat"  src={travel}/>
                    <div className="catTitle">Trips</div>
            </a>

            <a className="cat catOverlay" href="films">
                <img className="img_cat"  src={films}/>
                    <div className="catTitle">Films</div>
            </a>

            <a className="cat catOverlay" href="gaming">
                <img className="img_cat"  src={gaming}/>
                    <div className="catTitle">Gaming</div>
            </a>

            <a className="cat catOverlay" href="action">
                <img className="img_cat"  src={acao}/>
                    <div className="catTitle">Action</div>
            </a>

            <a className="cat catOverlay" href="documentary">
                <img className="img_cat"  src={doc}/>
                    <div className="catTitle">Documentary</div>
            </a>

            <a className="cat catOverlay" href="beauty">
                <img className="img_cat"  src={beauty}/>
                    <div className="catTitle">Beauty & Fashion</div>
            </a>

            <a className="cat catOverlay " href="food">
                <img className="img_cat"  src={food}/>
                    <div className="catTitle">Food</div>
            </a>
        </div>

    </div>
)

};

const mapStateToProps = (state) => {
  return {
    carrosel: state.carrosel.img
  }
}

export default connect(mapStateToProps)(Categorias);
