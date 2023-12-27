// const mongoose=require('mongoose');

// const categorySchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     description:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     course:[
//         {
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"Course"
//         }
//     ]
// });

// module.exports=mongoose.model('Category',categorySchema);
const mongoose = require("mongoose");

// Define the Tags schema
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: { type: String },
	courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
});

// Export the Tags model
module.exports = mongoose.model("Category", categorySchema);