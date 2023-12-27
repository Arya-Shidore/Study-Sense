// const express=require('express');
// const mongoose=require('mongoose');

// const courseSchema=new mongoose.Schema({
//     courseName:{
//         type:String
//     },
//     courseDescription:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     instructor:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User"
//     },
//     whatYouWilLearn:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     courseContent:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     courseSections:[
//         {
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"Section"
//         }
//     ],
//     ratingAndReviews:[
//         {
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"RatingAndReview"
//         }
//     ],
//     price:{
//         type:Number
//     },
//     thumbnail:{
//         type:String,
//     },
//     tags:{
//         type:[String],
//         required:true,
//         trim:true
//     },
//     category:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Category"
//     },
//     studentsEnrolled:[
//         {
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"User"
//         }
//     ],
//     instructions:{
//         type: [String]
//     },
//     status:{
//         type: [String],
//         enum: ["Draft","Published"]
//     }
// });

// module.exports=mongoose.model('Course',courseSchema);

const mongoose = require("mongoose");

// Define the Courses schema
const coursesSchema = new mongoose.Schema({
	courseName: { type: String },
	courseDescription: { type: String },
	instructor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	whatYouWillLearn: {
		type: String,
	},
	courseContent: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Section",
		},
	],
	ratingAndReviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "RatingAndReview",
		},
	],
	price: {
		type: Number,
	},
	thumbnail: {
		type: String,
	},
	tag: {
		type: [String],
		required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},
	studentsEnrolled: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
	],
	instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
});

// Export the Courses model
module.exports = mongoose.model("Course", coursesSchema);