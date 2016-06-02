'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CheckoutSchema = new mongoose.Schema({
  platform: String,
  keyName: String,
  value: Number,
  created_at:Date
});

CheckoutSchema.pre('save',function(next) {
 var now = new Date(); 
 if ( !this.created_at ) {
    this.created_at = now;
  }
  next();

});
module.exports = mongoose.model('Checkout', CheckoutSchema);