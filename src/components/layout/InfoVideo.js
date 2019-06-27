import React, {Component} from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { Likes } from '../../store/actions/likeActions.js';

class InfoVideo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: [],
            id: ' ',
            title: ' ',
            description: ' ',
            img: ''
        };
    }


    toogleInfo = (e) => {
      e.preventDefault();

  }

    render() {
      console.log(this.props.onClick)
        return (
            <div className='quickviewContainer' id={this.props.id}>
                <div className='close'/>
                <h2 className='headline'> {this.props.title} </h2>
                <span className='description' maxLength="11" style={{wordWrap:"break-word", display: 'block',
                                width: '100%',
                                height: "80px",
                                overflow: 'hidden',
                                whiteSpace: 'pre-line',
                                textOverflow: 'ellipsis'}}> {this.props.description + "..."}</span>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>
  {
    return {
    Likes: (like) => dispatch(Likes(like))
  }
  }

export default connect(null, mapDispatchToProps)(InfoVideo);
