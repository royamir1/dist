/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Checkout = require('./checkout.model');

exports.register = function(socket) {
  Checkout.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Checkout.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('checkout:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('checkout:remove', doc);
}