'use strict';
var mongoose = require('mongoose'),
  Nilai = mongoose.model('Nilais');

exports.list_all_nilai = function(req, res) {
    Nilai.find({}, function(err, results) {
      if (err)
        res.send(err);
      res.json({results});
    });
};

exports.input_nilai = function(req, res) {
  var nilaiTotal = ((parseFloat(req.body.dataArray.Nuts)*0.3)+(parseFloat(req.body.dataArray.Nuas)*0.4)+(parseFloat(req.body.dataArray.Ntugas)*0.15)+(parseFloat(req.body.dataArray.Nkuis)*0.15)).toFixed(2);
  var dataValue = req.body.dataArray;
  dataValue.total = nilaiTotal;
  var new_nilai = new Nilai(dataValue)
  console.log(dataValue);
  new_nilai.save(function(err, nilai) {
    if (err)
      res.send(err);
    res.json(nilai);
  });
};