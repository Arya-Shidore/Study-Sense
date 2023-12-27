// const express=require('express');
// const User=require('../models/User');
// const OTP=require('../models/OTP');
// const otpGenerator=require('otp-generator');
// const Profile = require('../models/Profile');
// //login
// exports.login=async (req,res)=>
// { 
//     try
//     {
//         const {email,password}=req.body;
//         if(!email || !password){
//             return res.status(400).json({error:"Please fill all the fields"});
//         }
//         const user=await User.findOne({email:email});
//         if(!user){
//             return res.status(400).json({error:"User does not exist"});
//         }
//         if(await bcrypt.compare(password,user.password))
//         {
//             const payload={
//                 email:user.email,
//                 id:user._id,
//                 accountType:user.accountType
//             }
//                 const token=jwt.sign(payload,process.env.JWT_SECRET,{
//                     expiresIn:"1d"
//                 });
//                 user.token=token;
//                 user.password=undefined;
                
//                 const options={
//                     expires:new Date(
//                         Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000
//                     ),
//                     httpOnly:true
//                 }
//                 res.cookie("token",token,options).status(200).json(
//                     {
//                         message:"Logged in successfully",
//                         token,
//                         user
//                     }
//                 );
//         }
//         else
//         {
//             return res.status(400).json({error:"Invalid credentials"}); 
//         }
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// }
// //signup

// exports.signup=async (req,res)=>{
//     try{
//         const {firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp}=req.body;
//         var existingUser=await User.findOne({email:email});
//         if(!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !contactNumber || !otp){
//             return res.status(400).json({error:"Please fill all the fields"});
//         }
//         if(password!==confirmPassword){
//             return res.status(400).json({error:"Passwords do not match"});
//         }
//         if(existingUser){
//             return res.status(400).json({error:"User already exists"});
//         }

//         const recentOtp=await OTP.findOne({email:email}).sort({createdAt:-1}).limit(1);
//         console.log(recentOtp)
//         if(!recentOtp){
//             return res.status(400).json({error:"OTP expired"});
//         }
//         else if(recentOtp.otp!==otp){
//             return res.status(400).json({error:"OTP is incorrect"});
//         }
//         //hash pwd
//         const hashedPassword=await bcrypt.hash(password,12);
       
//         const profileDetails=await Profile.create({
//             gender:null,
//             dateOfBirth: null,
//             about: null,
//             contactNumber: null
//         })

//         const user=await User.create({
//             firstName,
//             lastName,
//             email,
//             contactNumber,
//             password:hashedPassword,
//             accountType,
//             additionalDetails:profileDetails._id,
//             image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
//         });
//         //insert in db
//         return res.status(200).json({message:"User created successfully"});

//     }
//     catch(err){
//         console.log(err);
//     }
// }
// //send otp

// exports.sendOTP=async (req,res)=>{
//     try{

//         const {email}=req.body;
//         const checkUserPresent=await User.findOne({email:email});
//         if(checkUserPresent){
//             return res.status(400).json({error:"User already exists"});
//         }
//         var otp=otpGenerator.generate(6,{
//             upperCase:false,
//             specialChars:false,
//             alphabets:false
//         });
//         console.log("otp genearted")
//         const result=await findOne({otp:otp})
//         while(result){
//             otp=otpGenerator.generate(6,{
//                 upperCase:false,
//                 specialChars:false,
//                 alphabets:false
//             });
//             result=await findOne({otp:otp})
//         }
//         const otpPayload={
//             email:email,
//             otp:otp
//         }
//         const otpBody=await OTP.create(otpPayload);
//         console.log(otpBody)
//         res.status(200).json({message:"OTP sent"});

//     }
//     catch(err)
//     {
//         console.log(err)
//         console.log(err.message)
//     }
        
// }

// //change password
// exports.changePassword=async (req,res)=>{
//     try{
//         const {email,password,newpassword,confirmPassword}=req.body;
//         if(!password || !newpassword || !confirmPassword){
//             return res.status(400).json({error:"Please fill all the fields"});
//         }
//         if(newpassword!==confirmPassword){
//             return res.status(400).json({error:"Passwords do not match"});
//         }
//         //update in db
//         const user=await User.findOne({email:email});
//         if(!user){
//             return res.status(400).json({error:"User does not exist"});
//         }
//         user.password=await bcrypt.hash(newpassword,10);
//         //send mail
//         let transporter=nodemailer.createTransport({
//             service:"gmail",
//             auth:{
//                 user:process.env.EMAIL,
//                 pass:process.env.PASSWORD
//             }
//         });
//         let mailOptions={
//             from:process.env.EMAIL,
//             to:user.email,
//             subject:"Password changed",
//             text:"Your password has been changed successfully"
//         }
//         transporter.sendMail(mailOptions,(err,data)=>{
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 console.log("Email sent successfully");
//             }
//         });

//     }
//     catch(err){
//         console.log(err);
//     }
// }

// //export


const bcrypt = require("bcrypt");
const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const Profile = require("../models/Profile");
require("dotenv").config();

// Signup Controller for Registering USers

exports.signup = async (req, res) => {
	try {
		// Destructure fields from the request body
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			contactNumber,
			otp,
		} = req.body;
		// Check if All Details are there or not
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!otp
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		// Check if password and confirm password match
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

		// Find the most recent OTP for the email
		const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		console.log(response);
		if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

		// Create the Additional Profile For User
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});
		const user = await User.create({
			firstName,
			lastName,
			email,
			contactNumber,
			password: hashedPassword,
			accountType: accountType,
			approved: approved,
			additionalDetails: profileDetails._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};

// Login controller for authenticating users
exports.login = async (req, res) => {
	try {
		// Get email and password from request body
		const { email, password } = req.body;

		// Check if email or password is missing
		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		// Find user with provided email
		const user = await User.findOne({ email }).populate("additionalDetails");

		// If user not found with provided email
		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email, id: user._id, accountType: user.accountType },
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);

			// Save token to user document in database
			user.token = token;
			user.password = undefined;
			// Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
		} else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
};
// Send OTP For Email Verification
exports.sendotp = async (req, res) => {
	try {
		const { email } = req.body;

		// Check if user is already present
		// Find user with provided email
		const checkUserPresent = await User.findOne({ email });
		// to be used in case of signup

		// If user found with provided email
		if (checkUserPresent) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is Already Registered`,
			});
		}

		var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		const result = await OTP.findOne({ otp: otp });
		console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}
		const otpPayload = { email, otp };
		const otpBody = await OTP.create(otpPayload);
		console.log("OTP Body", otpBody);
		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });
	}
};

// Controller for Changing Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};