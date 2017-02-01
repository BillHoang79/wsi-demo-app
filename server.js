var express        = require('express');
var app            = express();
var morgan	       = require('morgan');
var path           = require('path');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var router         = express.Router();
var mongoose       = require('mongoose');
var methodOverride = require('method-override');

mongoose.connect( process.env.MONGODB_URI || "mongodb://macaframa:Dalo2555@ds045795.mlab.com:45795/garagesailors");

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain)
app.use(express.static(__dirname + 'public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());

var Schema = mongoose.Schema;

var itemSchema = new Schema({
  name: String,
  price: String,
  poi: Array,
  info: Array,
  img: Object
}, {
    versionKey: false
});

var Item = mongoose.model('Item', itemSchema);

app.get('/api/item', function(req, res, next){
  Item.find(function(err, item){
    if(err){
      res.send(err);
    }
    res.json(item);
  });
});

app.post('/api/item', function(req, res, next){
  Item.create({
    name: req.body.name,
    price: req.body.price,
    poi: req.body.poi,
    info: req.body.info,
    img: req.body.img
  }, function(err, item){
      if(err){
        res.send(err);
      }
      res.json(item);
  });
});

app.delete('/api/item/:item_id', function(req, res, next){
  Item.remove({
    _id: req.params.item_id
  }, function(err, item){
    if(err){
      res.send(err);
    }
    res.json(item);
  });
});

app.get('*', function(req, res){
	res.sendfile('index.html');
})

app.listen(process.env.PORT || 3000);
