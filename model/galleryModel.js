'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/gallery');

var Schema = mongoose.Schema;

var Picture = new Schema({
  filename: {
    type: String,
    Required: 'Kindly enter the name of the file'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  tags:
  {
    type:Array,
    Required: 'Atleast one tag is required..'
  }
});


module.exports = mongoose.model('Picture', Picture);