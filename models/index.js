var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/trip_planner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Place, Hotel, ThingToDo, Restaurant, User;
var Schema = mongoose.Schema;

var placeSchema = new Schema ({
	address: String,
	city: String,
	state: String,
	phone: String,
	location: [Number, Number]
});

var hotelSchema = new Schema ({
	name: String,
	place: [placeSchema],
	num_stars: {type: Number, min:1, max:5},
	amenities: String
});

var thingToDoSchema = new Schema ({
	name: String,
	place: [placeSchema],
	age_range: String
});

var restaurantSchema = new Schema ({
	name: String,
	place: [placeSchema],
	cuisine: String,
	price: {type: Number, min:1, max:5}
});

var userSchema = new Schema ({
	day: Number,
	myHotels: [hotelSchema]
});

Place = mongoose.model('Place', placeSchema);
Hotel = mongoose.model('Hotel', hotelSchema);
ThingToDo = mongoose.model('ThingToDo', thingToDoSchema);
Restaurant = mongoose.model('Restaurant', restaurantSchema);
User = mongoose.model('User', userSchema);


module.exports = {
	Place: Place,
	Hotel: Hotel,
	ThingToDo: ThingToDo,
	Restaurant: Restaurant,
	User: User
};