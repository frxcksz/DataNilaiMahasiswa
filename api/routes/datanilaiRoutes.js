'use strict';
module.exports = function(app) {
  var dataNilai = require('../controllers/nilaiController');
  var mongoose = require('mongoose'),
  Nilai = mongoose.model('Nilais');

  app.route('/')
    .get((req, res) => {
      Nilai.find({},{},function(err,results) {
        res.render('index.ejs', {
            "dataNilai" : results
        });
    });
  })

  app.route('/nilai')
    .get(dataNilai.list_all_nilai)
    .post(dataNilai.input_nilai);
};
