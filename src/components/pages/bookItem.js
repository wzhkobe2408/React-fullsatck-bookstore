"use strict"
import React from 'react';
import {Image, Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addToCart, updateCart} from '../../actions/cartActions';
import {bindActionCreators} from 'redux';

class BookItem extends React.Component {

  handleCart(){
    const cart = [...this.props.cart,{
      _id:this.props._id,
      title:this.props.title,
      description:this.props.description,
      images:this.props.images,
      price:this.props.price,
      quantity:1
    }]
    //check for exiting cartItem
    if(this.props.cart.length>0){
      //cart is not empty
      let _id = this.props._id;
      let cartIndex = this.props.cart.findIndex(function(cartItem){
        return cartItem._id === _id;
      })
      if(cartIndex === -1){
        this.props.addToCart(cart);
      }else {
        this.props.updateCart(_id,1,this.props.cart);
      }
    }else{
      //cart is empty
      this.props.addToCart(cart);
    }

  }
  constructor(){
    super();
    this.state={
      isClicked:false
    }
  }

  onReadMore(){
    this.setState({isClicked:true})
  }

  render() {
    return (
      <Well style={{display:"inline-block"}}>
        <Row>
          <Col xs={12} sm={4}>
            <Image src={this.props.images} responsive />
          </Col>
          <Col xs={6} sm={8}>
            <h5>{this.props.title}</h5>
            <p>
            {(this.props.description.length>50 && this.state.isClicked === false)?
            (this.props.description.substring(0,50)):(this.props.description)}
            <button className='link'
            onClick={this.onReadMore.bind(this)}>
            {(this.state.isClicked === false && this.props.description !== null && this.props.description.length>50)?('...read more'):('')}
            </button>
            </p>
            <h6>$ {this.props.price}</h6>
            <Button bsStyle = 'primary'
            onClick={this.handleCart.bind(this)}>Buy now</Button>
          </Col>
        </Row>
      </Well>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart:state.cart.cart
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      addToCart:addToCart,
      updateCart:updateCart
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BookItem);
