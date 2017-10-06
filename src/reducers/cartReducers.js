"use strict"

export function cartReducers(state={cart:[]},action) {
  switch(action.type){
    case "GET_CART":
      return {...state,
          cart:action.payload,
          totalAmout:totals(action.payload).amount,
          totalQty:totals(action.payload).qty
        }
    case "UPDATE_CART":
      return {...state,cart:action.payload,
        totalAmout:totals(action.payload).amount,
        totalQty:totals(action.payload).qty
      };
      break;
    case "ADD_TO_CART":
      return {...state,
              cart:action.payload,
              totalAmout:totals(action.payload).amount,
              totalQty:totals(action.payload).qty
            };
      break;
    case "DELETE_CART_ITEM":
      return {...state,cart:action.payload,
      totalAmout:totals(action.payload).amount,
      totalQty:totals(action.payload).qty
    };
      break;
  }
  return state
}

export function totals(payloadArr){
  const totalAmout = payloadArr.map(function(cartArr){
    return cartArr.price*cartArr.quantity;
  }).reduce(function(a,b){
    return a+b
  },0);

  const totalQty = payloadArr.map(function(qty){
    return qty.quantity;
  }).reduce(function(a,b){
    return a+b
  },0);

  return {amount:totalAmout.toFixed(2),qty:totalQty}
}
