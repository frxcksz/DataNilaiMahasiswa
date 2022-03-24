'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NilaiSchema = new Schema({
  nim:{
    type: Number,
  },
  nama: {
    type: String,
  },
  nm_mk: {
    type: String,
  },
  Ntugas: {
    type: Number,
  },
  Nkuis: {
    type: Number,
  },
  Nuts: {
    type: Number,
  },
  Nuas: {
    type: Number,
  },
  total: {
    type: Number
  },
});

module.exports = mongoose.model('Nilais', NilaiSchema);