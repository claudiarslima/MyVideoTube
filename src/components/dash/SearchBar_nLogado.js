import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {SearchAction} from '../../store/actions/searchActions';






class SearchBar_nLogado extends Component {

constructor(props) {
  super(props)


    this.state = {

      input: ''

    }
    this.onChange = this.onChange.bind(this);
}

  render() {

    return(
      <div className="searchbar" style={{
          backgroundColor: "rgb(128, 19, 54)",
          zIndex: "1300",
          position: "fixed",
          right: "23rem",
          color: "white"
      }} id="barra-pesquisa2">
          <input onChange={(event)=>this.onChange(event)} className="search_input" type="text"
                 name="" color="white" id="placeholder"
                 placeholder="Search..."/>
          <NavLink to="/paginainicial" className="search_icon" style={{textDecoration: "none"}}
                   id="icon-pesquisa"><i className="fas fa-search"/></NavLink>
      </div>
    )

  }

  onChange(event) {

      console.log("onevent" + event.target.value)

      //  this.setState({input: event.target.value});
        this.props.showView(event.target.value)

}
}


export default SearchBar_nLogado;
