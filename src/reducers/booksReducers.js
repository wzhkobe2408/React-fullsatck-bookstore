"use strict"

export function booksReducers(state={
  books:[]
},action){
  switch(action.type){
    case "GET_BOOKS":
      return {...state,books:[...action.payload]}
    case "POST_BOOK":
      return {...state,books:[...state.books,...action.payload],
        msg:'Saved! Click to continue',
        style:'success',validation:'success'};
      break;
    case "POST_BOOK_REJECTED":
      return {...state, msg:'Please, try again',
      style:'danger',validation:'error'};
      break;
    case "RESET_BUTTON":
      return {...state, msg:null,style:'primary',validation:null}
      break;
    case "DELETE_BOOK":
      let books = state.books.filter(function(book){
        return book._id != action.payload;
      });
      return {books};
      break;
    case "UPDATE_BOOK":
      let update_index = state.books.findIndex(function(book) {
        return book._id === action.payload._id;
      });
      let update_book = state.books[update_index];
      update_book = {...update_book,title:action.payload.title};
      return {books:[...state.books.slice(0,update_index),update_book,...state.books.slice(update_index+1)]};
      break;
  }
  return state
}
