// const mongoose=require('mongoose');

// const profileSchema=new mongoose.Schema({
//     gender:{
//         type:String,
//     },
//     dateOfBirth:{
//         type:Date,
//     },
//     about:{
//         type:String,
//     },
//     contactNumber:{
//         type:String,
//     }
// });

// module.exports=mongoose.model('Profile',profileSchema);
const mongoose = require("mongoose");

// Define the Profile schema
const profileSchema = new mongoose.Schema({
	gender: {
		type: String,
	},
	dateOfBirth: {
		type: String,
	},
	about: {
		type: String,
		trim: true,
	},
	contactNumber: {
		type: Number,
		trim: true,
	},
});

// Export the Profile model
module.exports = mongoose.model("Profile", profileSchema);