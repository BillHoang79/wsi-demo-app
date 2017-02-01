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

app.use(express.static(__dirname + 'public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());

var Schema = mongoose.Schema;

var dataSchema = new Schema({
  username: String,
  password: String,
  email: String
}, {
    versionKey: false
});

var Data = mongoose.model('Data', dataSchema);

app.get('/api/data', function(req, res, next){
  Data.find(function(err, data){
    if(err){
      res.send(err);
    }
    res.json(data);
  });
});

app.post('/api/data', function(req, res, next){
  Data.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }, function(err, data){
      if(err){
        res.send(err);
      }
      res.json(data);
  });
});

app.delete('/api/data/:data_id', function(req, res, next){
  Data.remove({
    _id: req.params.data_id
  }, function(err, data){
    if(err){
      res.send(err);
    }
    res.json(data);
  });
});

app.listen(3000);
