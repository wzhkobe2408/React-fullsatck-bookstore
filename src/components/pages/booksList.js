"use strict"

import React from 'react';
import {connect} from 'react-redux';
import {getBooks} from '../../actions/booksActions';
import {bindActionCreators} from 'redux';
import {Carousel, Grid, Col, Row, Button} from 'react-bootstrap';

import BookItem from './bookItem';
import BooksForm from './BooksForm';
import Cart from './cart';

class BooksList extends React.Component {

  componentDidMount() {
    //dispatch action
    this.props.getBooks();
  }

  render() {
    const booksList = this.props.books.map(function(book){
      return (
        <div key={book._id} className='col-sm-12 col-md-6'>
          <BookItem
            _id={book._id}
            title = {book.title}
            description = {book.description}
            images={book.images}
            price = {book.price}
          />
        </div>
      )
    });
    return (
      <Grid>
        <Row>
          <Carousel>
            <Carousel.Item>
              <img width={900} height={300} alt="900x300" src="/images/home1.png"/>
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img width={900} height={300} alt="900x300" src="/images/home2.png"/>
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
        <Row id='cart'>
          <Cart />
        </Row>
        <div id='flexbox'>
          {booksList}
        </div>
      </Grid>
    );
  }
}

function mapStateToProps(state){
  return {
    books: state.books.books
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getBooks:getBooks
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BooksList);
