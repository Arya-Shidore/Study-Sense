// const RatingAndReview=require('../models/RatingAndReview');
// const Course=require('../models/Course');

// exports.createRatingAndReview=async(req,res)=>{
//     try{
//         const userId=req.user.id;
//         const {courseId,rating,review}=req.body;
//         const courseDetails=await Course.findOne({
//             _id:courseId,
//             studentsEnrolled:{$eleMatch:{$eq:userId}}
//         })
//         if(!courseDetails)
//         {
//             return res.status(400).json({message:"You are not enrolled in this course"});
//         }
//         const alreadyRated=await RatingAndReview.findOne({
//             course:courseId,
//             user:userId
//         });
//         if(alreadyRated)
//         {
//             return res.status(400).json({message:"You have already rated this course"});
//         }
//         const ratingAndReview=new RatingAndReview({
//             course:courseId,
//             user:userId,
//             rating,
//             review
//         });
//         await Course.findByIdAndUpdate
//         (
//             {
//                 $push:{
//                     ratingAndreviews:ratingAndReview._id
//                 }
//             },
//             {
//                 new:true
//             }
//         );
//         return res.status(200).json({message:"Rating and review added successfully"});
//     }
//     catch(err){
//         console.log(err);

//     }
// }


// exports.getAverageRating=async(req,res)=>{
//     try{
//         const {courseId}=req.body;
//         const result=await RatingAndReview.aggregate([
//             {
//                 $match:{
//                     course:new mongoose.Types.ObjectId(courseId)
//                 }
//             },
//             {
//                 $group:{
//                     _id:null,
//                     averageRating:{$avg:"$rating"}
//                 }
//             }
//         ]);
//         if(result.length==0)
//         {
//             return res.status(200).json({averageRating:0});
//         }
//         return res.status(200).json({averageRating:result[0].averageRating});
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// exports.getAllRatingAndReviews=async(req,res)=>{
//     try{
//         const allReviews=await RatingAndReview.find({}).sort({rating:"desc"}).populate('user').populate('course').exec();

//     }
//     catch(err){
//         console.log(err);
//     }
// }
const RatingAndReview = require("../models/RatingAndRaview");
const Course = require("../models/Course");
const { mongo, default: mongoose } = require("mongoose");

//createRating
exports.createRating = async (req, res) => {
    try{

        //get user id
        const userId = req.user.id;
        //fetchdata from req body
        const {rating, review, courseId} = req.body;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
                                    {_id:courseId,
                                    studentsEnrolled: {$elemMatch: {$eq: userId} },
                                });

        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }
        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
                                                user:userId,
                                                course:courseId,
                                            });
        if(alreadyReviewed) {
                    return res.status(403).json({
                        success:false,
                        message:'Course is already reviewed by the user',
                    });
                }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
                                        rating, review, 
                                        course:courseId,
                                        user:userId,
                                    });
       
        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                    {
                                        $push: {
                                            ratingAndReviews: ratingReview._id,
                                        }
                                    },
                                    {new: true});
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingReview,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}



//getAverageRating
exports.getAverageRating = async (req, res) => {
    try {
            //get course ID
            const courseId = req.body.courseId;
            //calculate avg rating

            const result = await RatingAndReview.aggregate([
                {
                    $match:{
                        course: new mongoose.Types.ObjectId(courseId),
                    },
                },
                {
                    $group:{
                        _id:null,
                        averageRating: { $avg: "$rating"},
                    }
                }
            ])

            //return rating
            if(result.length > 0) {

                return res.status(200).json({
                    success:true,
                    averageRating: result[0].averageRating,
                })

            }
            
            //if no rating/Review exist
            return res.status(200).json({
                success:true,
                message:'Average Rating is 0, no ratings given till now',
                averageRating:0,
            })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//getAllRatingAndReviews

exports.getAllRatingReview = async (req, res) => {
    try{
            const allReviews = await RatingAndReview.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select: "courseName",
                                    })
                                    .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }   
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}