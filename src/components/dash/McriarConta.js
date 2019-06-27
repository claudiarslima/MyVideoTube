import React, {Component} from 'react';
import SearchBar from './SearchBar.js';
import ModalVideo from '../layout/ModalVideo';
import fundo from "../../img/my1.png";

const array_geral = [];

class McriarConta extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            id: ' '
        }

    }



    render() {

        return (
            <div >

                {/*as classes "animated slideInUp e delay" dfazem a aniamção da div a subir quando se pesquisa*/}
            <div className="display-desktop animated slideInDown delay-4" id="teste" style={{backgroundColor: "black", position: "absolute", zIndex: 12000, display: "block", marginTop: '-400px', marginRight: '-200px', height: '100%', width: '100%'}}>

                <div className="" style={{ minWidth: 100 + '%', height: 50 + 'vh', minHeight: 565 + 'px',  position: 'absolute' }}>
                    <img src={fundo} style={{minWidth: 100 + '%', height: 100 + 'vh', minHeight: 565 + 'px', opacity: '0.5'}}/>
                </div>
                <div className="col-md-12  display-none" style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', height: "100vh", width: 100 + "%", padding: "2rem"}}>


                    <div className="text-center" >
                        <div className="display-desktop" style={{marginTop: 200 + "px"}}>
                            <div className="text-center">
                                <h2 className=" titulos_login">This action is only available to account users.</h2>

                                <h3 className="mt-5 titulos_login" >Do You Already know the advantages of having an account?</h3>
                            </div>

                            <div className="row ml-5" style={{marginTop: "80px", backgroundColor: "transparent !important" }}>
                                <div className="col-md-3 d-flex  links legendas_login mb-3">
                                    <span style={{margin: 'auto'}}>Have a Personalized Experience.</span>
                                </div>
                                <div className="col-md-3 d-flex  links legendas_login mb-3" >
                                    <span style={{margin: 'auto'}}>Add Videos to a Watch Later List.</span>
                                </div>
                                <div className="col-md-3 d-flex  links legendas_login mb-3">
                                    <span style={{margin: 'auto'}}>Add Videos to a Favorite List</span>
                                </div>
                                <div className="col-md-3 d-flex  links legendas_login mb-3" >
                                    <span style={{margin: 'auto'}}>See Recommended Videos for You.</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center" style={{marginTop: "70px"}}>
                                <a href="/Dashboard">
                                    <button type="submit" name="button" className="btn btn-danger" style={{backgroundColor: "rgb(128, 19, 54)", border: "solid 4px rgb(128, 19, 54)"}}>I want to try it!</button>
                                </a>

                            </div>
                            <div className="d-flex justify-content-center  login_container" style={{marginTop: "20px"}}>
                                <a href="/paginainicial"><button type="submit" name="button" className="btn btn-secondary" style={{}}> Continue without Account </button></a>
                            </div>
                        </div>
                        {/*<img src={ teste2 } className="mb-3" style={{width: 100 + '%', margin: 'auto'}}/>*/}

                        {/*<h4 className="legendas_login mt-3">Vê todos os vídeos de que gostas num só lugar!</h4>*/}
                    </div>
                </div>

            </div>


                {/*as classes "animated slideInUp e delay" dfazem a aniamção da div a subir quando se pesquisa*/}
                <div className="display-mobile animated slideInDown delay-4" id="teste" style={{backgroundColor: "black", position: "absolute", zIndex: 12000, display: "block", height: '100%', width: '100%'}}>

                    <div className="" style={{ width: "100%", height: 50 + 'vh', minHeight: 565 + 'px',  position: 'absolute' }}>
                        <img src={fundo} style={{width: "100%", height: 100 + 'vh', minHeight: 565 + 'px', opacity: '0.5'}}/>
                    </div>
                    <div className="col-md-12  display-none" style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', height: 100 + "%",  padding: "2rem"}}>


                        <div className="text-center"  style={{marginTop: -200 + "px"}}>
                            <div className=" " style={{marginTop: 221 + "px"}}>
                                <div className="text-center">
                                    <h3 className=" titulos_login">This action is only available to account users.</h3>

                                    <h4 className="mt-5 titulos_login" >Do You Already know the advantages of having an account?</h4>
                                </div>

                                <div className="row" style={{marginTop: "80px", backgroundColor: "transparent !important" }}>
                                    <div className="col-md-3 d-flex  links legendas_login mb-3" style={{borderRight: "solid 1px rgb(128, 19, 54)"}}>
                                        <span style={{margin: 'auto'}}>Have a Personalized Experience.</span>
                                    </div>
                                    <div className="col-md-3 d-flex  links legendas_login mb-3" style={{borderRight: "solid 1px rgb(128, 19, 54)"}}>
                                        <span style={{margin: 'auto'}}>Add Videos to a Watch Later List.</span>
                                    </div>
                                    <div className="col-md-3 d-flex  links legendas_login mb-3" style={{borderRight: "solid 1px rgb(128, 19, 54)"}}>
                                        <span style={{margin: 'auto'}}>Add Videos to a Favorite List.</span>
                                    </div>
                                    <div className="col-md-3 d-flex  links legendas_login mb-3" >
                                        <span style={{margin: 'auto'}}>See Recommended Videos for You.</span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center" style={{marginTop: "70px"}}>
                                    <a href="/Dashboard">
                                        <button type="submit" name="button" className="btn btn-danger" style={{backgroundColor: "rgb(128, 19, 54)", border: "solid 4px rgb(128, 19, 54)"}}>I want to try it!</button>
                                    </a>

                                </div>
                                <div className="d-flex justify-content-center  login_container" style={{marginTop: "20px"}}>
                                    <a href="/paginainicial"><button type="submit" name="button" className="btn btn-secondary" style={{}}> Continue without Account </button></a>
                                </div>
                            </div>
                            {/*<img src={ teste2 } className="mb-3" style={{width: 100 + '%', margin: 'auto'}}/>*/}

                            {/*<h4 className="legendas_login mt-3">Vê todos os vídeos de que gostas num só lugar!</h4>*/}
                        </div>
                    </div>

                </div>


            </div>
        )
    }
}



export default McriarConta;
