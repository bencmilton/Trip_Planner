var express = require('express');
var router = express.Router();
var models = require('../models');
var async = require('async');

var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var ThingToDo = models.ThingToDo;
var User = models.User;

router.get('/', function(req, res, next) {
	async.parallel({
		all_hotels: function(done){
			 Hotel.find({}, function(err, hotels){
				 done(null, hotels);
			});
		},
		all_restaurants: function(done){
			 Restaurant.find({}, function(err, restaurants){
				 done(null, restaurants);
			});
		}, 
		all_things_to_do: function(done){
			 ThingToDo.find({}, function(err, thingsToDo){
				 done(null, thingsToDo);
			});
		}}, function(err, data){
			if (err) return next(err);
			res.render('index', data);
		});

});

router.post('/:place/add', function(req, res){
	var place = req.params.place;
	if (place === 'hotel') {
		console.log(req.body);
		Hotel.findOne(req.body, function (err, hotel){
			if (err) return next(err);
			
			User.day
			User.hotels

			save();
			res.redirect("/");
		});
	}
	
	
});

module.exports = router;

// Hotel.find({}, function(err, hotels) {
//     Restaurant.find({}, function(err, restaurants) {
//         ThingToDo.find({}, function(err, thingsToDo) {
//         	console.log('yoyoyoyoy');
//             res.render('index', {
//                 all_hotels: "djfd", //hotels,
//                 all_restaurants: "klasdjf", //restaurants,
//                 all_things_to_do: "fasldfjas"//thingsToDo
//             });
//         });
//     });
// });