"use strict"
//import react
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

//react router
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

//import combine reducers
import reducers from './reducers/index';

//import actions
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions'

//create store
const middleware = applyMiddleware(thunk,logger);
const store = createStore(reducers,middleware);

//import react component
import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';
import About from './components/pages/about';
import Contact from './components/pages/contact';

const Routes = (
  <Provider store = {store}>
      <Router history={browserHistory}>
        <Route path='/' component={Main}>
          <IndexRoute component={BooksList} />
          <Route path='/admin' component={BooksForm} />
          <Route  path='/carts' component={Cart} />
          <Route  path='/about' component={About} />
          <Route  path='/contact' component={Contact} />
        </Route>
      </Router>
  </Provider>
)


//render
render(
  Routes,document.getElementById('app')
);
