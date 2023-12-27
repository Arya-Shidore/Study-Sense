// const express=require('express');
// const mongoose=require('mongoose');
// const jwt=require('jsonwebtoken');
// const User=require('../models/User');
// const Course=require('../models/Course');
// const Section=require('../models/Section');
// const SubSection=require('../models/SubSection');

// //auth
// exports.auth=async(req,res,next)=>{
//     try{
//         const token=req.cookies.token || req.body.token || req.header('Authorization').replace('Bearer ','');
//         if(!token){
//             throw new Error();
//         }
//         try{
//             const decoded=jwt.verify(token,process.env.JWT_SECRET);
//             console.log(decoded);
//             req.user=decoded;
//         } 
//         catch(e){
//             throw new Error();
//         }
//         next();
//     }
//     catch(e){
//         res.status(401).send({error:'Please authenticate'});
//     }
// }

// //isStudent
// exports.isStudent=async(req,res,next)=>{
//     try{
//         if(req.user.accountType==="Student"){
//             next();
//         }
//         else{
//             throw new Error();
//         }
//     }catch(e){
//         res.status(401).send({error:'Please authenticate'});
//     }
// }

// //isInstructor 
// exports.isInstructor=async(req,res,next)=>{
//     try{
//         if(req.user.accountType==="Instructor"){
//             next();
//         }
//         else{
//             throw new Error();
//         }
//     }catch(e){
//         res.status(401).send({error:'Please authenticate'});
//     }
// }
// //isAdmin
// exports.isAdmin=async(req,res,next)=>{
//     try{
//         if(req.user.accountType==="Admin"){
//             next();
//         }
//         else{
//             throw new Error();
//         }
//     }catch(e){
//         res.status(401).send({error:'Please authenticate'});
//     }
// }

const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
    try{
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorisation").replace("Bearer ", "");

        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}

//isStudent
exports.isStudent = async (req, res, next) => {
 try{
        if(req.user.accountType !== "Student") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Students only',
            });
        }
        next();
 }
 catch(error) {
    return res.status(500).json({
        success:false,
        message:'User role cannot be verified, please try again'
    })
 }
}


//isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Instructor") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Instructor only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }


//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{    
           console.log("Printing AccountType ", req.user.accountType);
           if(req.user.accountType !== "Admin") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }