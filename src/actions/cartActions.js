"use strict"
import axios from 'axios';

export function getCart(){
  return function(dispatch){
    axios.get('/cart')
      .then(function(response){
        dispatch({type:"GET_CART",payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"GET_CART_REJECTED",msg:"error when getting the cart from session"})
      })
  }
}

export function addToCart(cart){
    return function(dispatch){
      axios.post('/cart',cart)
        .then(function(response){
          dispatch({type:"ADD_TO_CART",payload:response.data})
        })
        .catch(function(err){
          dispatch({type:"ADD_TO_CART_REJECTED",msg:'error when adding to the cart'})
        })
    }
}

export function deleteCartItem(cart){
  return function(dispatch){
    axios.post('/cart',cart)
      .then(function(response){
        dispatch({type:"DELETE_CART_ITEM",payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"DELETE_CART_ITEM_REJECTED",msg:'error when deleting an item from the cart'})
      })
  }
}

export function updateCart(_id,unit,cart){
  let update_index = cart.findIndex(function(cartItem) {
    return cartItem._id === _id;
  });
  let update_cart = cart[update_index];
  update_cart = {...update_cart,quantity:unit+update_cart.quantity};
  let cartUpdate = [...cart.slice(0,update_index),update_cart,...cart.slice(update_index+1)];

  return function(dispatch){
    axios.post('/cart',cartUpdate)
      .then(function(response){
        dispatch({type:"UPDATE_CART",payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"UPDATE_CART_REJECTED",msg:'error when adding to the cart'})
      })
  }
}
