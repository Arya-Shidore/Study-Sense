// const Section=require('../models/Section');
// const Course=require('../models/Course');

// exports.createSection=async (req,res)=>{
//     try{
//         const {sectionName,courseId}=req.body;
//         if(!sectionName || !courseId){
//             return res.status(400).json({error:"Please fill all the fields"});
//         }
//         const existingSection=await Section.findOne({sectionName:sectionName});
//         if(existingSection){
//             return res.status(400).json({error:"Section already exists"});
//         }
//         const section=await Section.create({sectionName:sectionName});
//         res.status(200).json({message:"Section created successfully"});
//         //update course
        
//         const updatedCourseDetails=await Course.findByIdAndUpdate(
//             {
//                 _id:courseId
//             },
//             {
//                 $push:{
//                     sections:section._id
//                 }
//             },
//             {
//                 new:true
//             }
//         )
//         return res.status(200).json({message:"Section created successfully"});
//     }
//     catch(err){
//         console.log(err);
//     }
// }


// exports.updateSection=async (req,res)=>{
//     try{
//         const {sectionId,sectionName}=req.body;
//         if(!sectionId || !sectionName){
//             return res.status(400).json({error:"Please fill all the fields"});
//         }
//         const existingSection=await Section.findById(sectionId);
//         if(!existingSection){
//             return res.status(400).json({error:"Section does not exist"});
//         }
//         const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});


//         return res.status(200).json({message:"Section updated successfully"});
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// exports.deleteSelectedSection=async (req,res)=>{
//     try{
//         const {sectionId}=req.body;
//         if(!sectionId){
//             return res.status(400).json({error:"Please fill all the fields"});
//         }
//         const existingSection=await Section.findById(sectionId);
//         if(!existingSection){
//             return res.status(400).json({error:"Section does not exist"});
//         }
//         const section=await Section.findByIdAndDelete(sectionId);
//         return res.status(200).json({message:"Section deleted successfully"});
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// exports.showAllSections=async(req,res)=>{
//     try{
//         const sections=await Section.find({},{sectionName:true});
//         res.status(200).json({sections:sections});
//     }
//     catch(err){
//         console.log(err);
//     }
// }
const Section = require("../models/Section");
const Course = require("../models/Course");
// CREATE a new section
exports.createSection = async (req, res) => {
	try {
		// Extract the required properties from the request body
		const { sectionName, courseId } = req.body;

		// Validate the input
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

		// Create a new section with the given name
		const newSection = await Section.create({ sectionName });

		// Add the new section to the course's content array
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		// Return the updated course object in the response
		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});
	} catch (error) {
		// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

// UPDATE a section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);
		res.status(200).json({
			success: true,
			message: section,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// DELETE a section
exports.deleteSection = async (req, res) => {
	try {
		//HW -> req.params -> test
		const { sectionId } = req.params;
		await Section.findByIdAndDelete(sectionId);
		//HW -> Course ko bhi update karo
		res.status(200).json({
			success: true,
			message: "Section deleted",
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};