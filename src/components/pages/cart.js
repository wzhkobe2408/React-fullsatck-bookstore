"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Alert, Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {deleteCartItem, updateCart, getCart} from '../../actions/cartActions';
import {bindActionCreators} from 'redux';

class Cart extends React.Component {
  componentDidMount(){
      this.props.getCart();
  }

  onDelete(_id) {
    const cartAfterDelete = this.props.cart.filter(function(cartItem){
      return cartItem._id !== _id;
    });
    this.props.deleteCartItem(cartAfterDelete);
  }

  onIncrement(_id){
    this.props.updateCart(_id,1,this.props.cart);
  }

  onDecrement(_id,quantity){
    if(quantity>1){
      this.props.updateCart(_id,-1,this.props.cart);
    }else if(quantity === 1){
      const cartAfterDelete = this.props.cart.filter(function(cartItem){
        return cartItem._id !== _id;
      });
      this.props.deleteCartItem(cartAfterDelete);
    }
  }

  constructor() {
    super();
    this.state = {
      showModal:false
    }
  }
  open(){
    this.setState({showModal:true})
  }

  close(){
    this.setState({showModal:false})
  }


  render() {
      if(this.props.cart[0]) {
      return this.renderCart();
      }else {
        return this.renderEmpty();
      }
  }

  renderEmpty() {
    return (
    <div id='nocart' style={{marginTop:"5px"}}>
      <Alert bsStyle="warning" style={{textAline:"center",display:"inline-block",marginBottom:"5px"}}>
        <strong>Ops!</strong>You don't have anything in your cart right now.
      </Alert>
      <br />

    </div>
);
  }

  renderCart() {
    const cartItemList = this.props.cart.map(function(cartItem){
      return (
        <Panel key={cartItem._id} style={{maxWidth:"900px",width:"90%"}}>
          <Row>
          <Col xs={12} sm={4}>
            <h6>{cartItem.title}</h6><span>    </span>
          </Col>

          <Col xs={12} sm={2}>
            <h6>$ {cartItem.price}</h6>
          </Col>

          <Col xs={12} sm={2}>
            <h6>Quantity <Label bsStyle="success">{cartItem.quantity}</Label></h6>
          </Col>

          <Col xs={6} sm={4}>
            <ButtonGroup style={{minWidth:'300px'}}>
              <Button bsStyle='default' bsSize='small' onClick = {this.onDecrement.bind(this,cartItem._id,cartItem.quantity)}>-</Button>
              <Button bsStyle='default' bsSize='small' onClick = {this.onIncrement.bind(this,cartItem._id)}>+</Button>
              <span>     </span>
              <Button bsStyle='danger' bsSize='small' onClick={this.onDelete.bind(this,cartItem._id)}>DELETE</Button>
            </ButtonGroup>
          </Col>
          </Row>
        </Panel>
      )
    },this)
    return (
      <Panel header='Cart' bsStyle='primary' style={{margin:'15px auto 0',maxWidth:"900px"}}>
        {cartItemList}
        <Row>
          <Col xs={12}>
            <h6>Total amount: {this.props.totalAmout}</h6>
            <Button bsStyle="success" bsSize="small" onClick = {this.open.bind(this)}>
              PROCEED TO CHECKOUT
            </Button>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Thank You!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Your order has been saved</h6>
            <p>You will receive an email confirmation</p>
          </Modal.Body>
          <Modal.Footer>
            <Col xs={6}><h6>total $: {this.props.totalAmout}</h6></Col>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart:state.cart.cart,
    totalAmout:state.cart.totalAmout,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteCartItem:deleteCartItem,
    updateCart:updateCart,
    getCart:getCart
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);
