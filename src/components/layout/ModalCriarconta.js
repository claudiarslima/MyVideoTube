import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
// require("react-bootstrap/ModalHeader");
import { Button } from 'reactstrap';
import Slider from "./SliderSugest";



class ModalCriarconta extends React.Component {
    constructor(props) {
        super(props)
    }

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    };

    render() {
        if(!this.props.show){
            return null;
        }
        return (
        <div style={{zIndex: 1000}}>
            <div style={{backgroundColor: "white"}}>Hello Modal</div>
            <div >
                <button
                    onclose={(e) => {
                        this.onClose(e);
                    }}
                >
                    Close
                </button>
            </div>
        </div>

        );
    }
}




export default ModalCriarconta;