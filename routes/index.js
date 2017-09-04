var express = require('express');
var router = express.Router();
var hackerRank = require('machinepack-hackerrank');
var Client = require("node-rest-client").Client;
var client = new Client();
var url_api = "http://siswa_api.local";



function randomSoalID(){
	min = Math.ceil(1);
	max = Math.floor(3);
	return Math.floor(Math.random()*(max-min+1))+min;
}

/* GET home page. */
router.get('/', function(req, res, next) {

	client.get(url_api+"/soal/1", function(data_soal, response){
		client.get(url_api+"/siswa/1", function(data_siswa, resp){
			// console.log(data_soal.potongan_kode);
			res.render('index', {language:"1",langCode:"c_cpp", potongan_kode:data_soal.potongan_kode, bantuan:data_soal.clue, soal:data_soal.soal, soal_id:data_soal.id, nama:data_siswa.nama, siswa_id:data_soal.id});
		});
	});
	// console.log(data_siswa);
		
});

router.post('/compile', function(req, res, next) {

hackerRank.submit({
	apiKey: 'hackerrank|807508-1658|2aa5b8613b2bc21fea74103960a46e2146eb1efb',
	source: req.body.source,
	language: parseInt(req.body.language),
	testcases: JSON.parse(req.body.input),
	wait: true,
	callbackUrl: '',
	format: 'json',
	}).exec({
// An unexpected error occurred.
	error: function (err) {
		throw err;
	},
// OK.
	success: function (response) {
 	console.log(response)
	 res.json(response);
	},
	});

});

router.get('/changelang/:langCode/:language', function(req, res, next) {
var language = req.params.language.trim();
var langCode = req.params.langCode.trim();

res.render('index',{language:language,langCode:langCode});

});

module.exports = router;
