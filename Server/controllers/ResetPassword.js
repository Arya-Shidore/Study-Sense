// const user=require('../models/User');
// const bcrypt=require('bcryptjs');
// const mailsender=require('../utils/mailS ender');

// exports.resetPasswordToken=async(req,res)=>{
//     try{
//         const email=req.body.email;
//         if(!email){
//             return res.status(400).json({error:"Please fill all the fields"});
//         }
//         const existingUser=await user.findOne({email:email});
//         if(!existingUser){
//             return res.status(400).json({error:"User does not exist"});
//         }
//         const token=crypto.randomUUID();
//         const updatedDetails=await user.findOneAndUpdate(
//             {email:email},
//             {
//                 token:token,
//                 resetPasswordExpires: Date.now()+5*60*1000
//             },
//             {new:true}
//         )
//         const url=`http:localhost:3000/resetPassword/${token}`;
//         const mailResponse=await mailsender(email,"Reset Password",`Click on the link to reset your password ${url}`);
//         console.log("sent",mailResponse);
//         res.json({message:"Reset password link sent to your email"})
//     }
//     catch(err){
//         console.log(err);
//     }
// }


// exports.resetPassword=async(req,res)=>{
//     try{
//         const {password,confirmPassword,token}=req.body;
//         if(!password || !confirmPassword || !token){
//             return res.status(400).json({error:"Please fill all the fields"});
//         }
//         if(password!==confirmPassword){
//             return res.status(400).json({error:"Passwords do not match"});
//         }
//         const existingUser=await user.findOne({token:token});
//         if(!existingUser){
//             return res.status(400).json({error:"Invalid token"});
//         }
//         if(existingUser.resetPasswordExpires<Date.now()){
//             return res.status(400).json({error:"Token expired"});
//         }
//         const salt=await bcrypt.genSalt(10);
//         const hashedPassword=await bcrypt.hash(password,salt);
//         const updatedDetails=await user.findOneAndUpdate(
//             {token:token},
//             { 
//                 password:hashedPassword,
//                 token:undefined,
//                 resetPasswordExpires:undefined
//             },
//             {new:true}
//         )
//         res.json({message:"Password reset successfully"});
//     }
//     catch(err){
//         console.log(err);
//     }
// }
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
	try {
		const email = req.body.email;
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.json({
				success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			});
		}
		const token = crypto.randomBytes(20).toString("hex");

		const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				token: token,
				resetPasswordExpires: Date.now() + 3600000,
			},
			{ new: true }
		);
		console.log("DETAILS", updatedDetails);

		const url = `http://localhost:3000/update-password/${token}`;

		await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);

		res.json({
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
	}
};

exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token } = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};