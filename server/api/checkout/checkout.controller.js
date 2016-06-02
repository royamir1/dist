'use strict';

var _ = require('lodash');
var Checkout = require('./checkout.model');

// Get list of checkouts
exports.index = function(req, res) {
  Checkout.find(function (err, checkouts) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(checkouts);
  });
};

// Get a single checkout
exports.show = function(req, res) {
  Checkout.findById(req.params.id, function (err, checkout) {
    if(err) { return handleError(res, err); }
    if(!checkout) { return res.status(404).send('Not Found'); }
    return res.json(checkout);
  });
};

// Creates a new checkout in the DB.
exports.create = function(req, res) {
  Checkout.create(req.body, function(err, checkout) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(checkout);
  });
};

// Updates an existing checkout in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Checkout.findById(req.params.id, function (err, checkout) {
    if (err) { return handleError(res, err); }
    if(!checkout) { return res.status(404).send('Not Found'); }
    var updated = _.merge(checkout, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(checkout);
    });
  });
};

// Deletes a checkout from the DB.
exports.destroy = function(req, res) {
  Checkout.findById(req.params.id, function (err, checkout) {
    if(err) { return handleError(res, err); }
    if(!checkout) { return res.status(404).send('Not Found'); }
    checkout.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}