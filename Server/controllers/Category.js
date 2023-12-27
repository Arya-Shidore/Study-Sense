// const Category=require('../models/Category');

// exports.createCategory=async(req,res)=>{
//     try{
//         const {name,description}=req.body;
//         if(!name || !description){
//             return res.status(400).json({error:"Please fill all the fields"});
//         }
//         const existingCategory=await Category.findOne({name:name});
//         if(existingCategory){
//             return res.status(400).json({error:"existingCategory already exists"});
//         }
//         const category=await existingCategory.create({name:name,description:description});
//         res.status(200).json({message:"existingCategory created successfully"});
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// exports.showAllCategory=async(req,res)=>{
//     try{
//         const category=await Category.find({},{name:true,description:true});
//         res.status(200).json({category:category});
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// exports.categoryPageDetails=async(req,res)=>{
//     try{
//         const {categoryId}=req.body;
//         const selectedCategory=await Category.findById(categoryId).populate('course').exec();
//         if(!selectedCategory){
//             return res.status(400).json({error:"Category does not exist"});
//         }

//         const differentCategory=await Category.find({_id:{$ne:categoryId}}).limit(3).populate('course').exec();
//         const topSellingCourses=await Course.find({category:categoryId}).sort({studentsEnrolled:-1}).limit(3).populate('category').exec();
//         return res.status(200).json({selectedCategory,differentCategory,topSellingCourses});
//     }
//     catch(err){
//         console.log(err);
//     }
// }
const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		console.log(CategorysDetails);
		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

exports.showAllCategories = async (req, res) => {
	try {
		const allCategorys = await Category.find(
			{},
			{ name: true, description: true }
		);
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

//categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
    try {
            //get categoryId
            const {categoryId} = req.body;
            //get courses for specified categoryId
            const selectedCategory = await Category.findById(categoryId)
                                            .populate("courses")
                                            .exec();
            //validation
            if(!selectedCategory) {
                return res.status(404).json({
                    success:false,
                    message:'Data Not Found',
                });
            }
            //get coursesfor different categories
            const differentCategories = await Category.find({
                                         _id: {$ne: categoryId},
                                         })
                                         .populate("courses")
                                         .exec();

            //get top 10 selling courses
            //HW - write it on your own

            //return response
            return res.status(200).json({
                success:true,
                data: {
                    selectedCategory,
                    differentCategories,
                },
            });

    }
    catch(error ) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}