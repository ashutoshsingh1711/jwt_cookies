const bcrypt = require('bcrypt');
const User = require('../models/user');

//signup route handler
exports.signup = async (req, res) =>{
    try{
        //get data
        const {name, email, password, role} = req.body;
        //check if user already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                success:false,
                message:'Email is taken',
            });
        }
        //secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in hashing password",
            })
        }

        //create entry for user
        const user = await User.create({
            name,email,password:hashedPassword,role
        })
        return res.json(200).json({
            success:true,
            message:"User Created Successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"User cant be registered, please try again later",
        })
    }
}