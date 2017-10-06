var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();
app.use(logger('dev'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongodb connected...")
});


// ----->>>>> SET UP SESSIONS <<<<------
app.use(session({
  secret:'mySecretString',
  saveUninitialized:false,
  resave:false,
  cookie:{maxAge:1000*60*60*24*2},
  store:new MongoStore({mongooseConnection: db, ttl:2*24*60*60})
}))

//SAVE TO SESSION
app.post('/cart',function(req,res){
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err){
    if(err){
      throw err;
    }
    res.json(req.session.cart);
  })
})

app.get('/cart',function(req,res){
  if(typeof req.session.cart!=='undefined'){
    res.json(req.session.cart);
  }
})

// ----->>>> END SESSION SET UP <<<<<-------

var Books = require('./models/books.js');

//----->>> POST BOOKS <<<-----
app.post('/books',function(req,res){
  var book = req.body;
  Books.create(book,function(err,books){
    if(err){
      throw err;
    }
    res.json(books);
  })
});

//------>>>> GET BOOKS <<<<<-------
app.get('/books',function(req,res){
  Books.find(function(err,books){
    if(err){
      throw err;
    }
    res.json(books);
  })
});

//----->>> DELETE BOOKS <<<----
app.delete('/books/:_id',function(req,res){
  var query = {_id:req.params._id};

  Books.remove(query,function(err,books){
    if(err){
      throw err;
    }
    res.json(books);
  })
});

//----->>>> UPDATE BOOKS <<<<------
app.put('/books/:_id',function(req,res){
  var book = req.body;
  var query = req.params._id;
  var update = {
    '$set':{
      title:book.title,
      description:book.description,
      image:book.image,
      price:book.price
    }
  };
  var options = {new: ture};

  Books.findOneAndUpdate(query,update,options,function(err,books){
    if(err){
      throw err;
    }
    res.json(books);
  })
})

// ---->>>> GET BOOK IAMGE API <<<<------
app.get('/images',function(req,res){
  const imgFolder = __dirname + '/public/images';
  const fs = require('fs');
  fs.readdir(imgFolder,function(err,files){
    if(err){
      return console.error(err);
    }
    const fileArr = [];
    files.forEach(function(file){
      fileArr.push({name: file});
    });
    res.json(fileArr);
  })
})

//END API

app.get('*',function(req,res) {
  res.sendFile(path.resolve(__dirname,'public','index.html'));
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
