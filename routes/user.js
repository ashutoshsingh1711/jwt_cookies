const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {login, signup} = require('../controllers/auth');
const {auth, isAdmin, isStudent} = require('../middlewares/auth');
router.post("/login",login);
router.post("/signup",signup);

router.get("/test", auth, (req,res) => {
    res.json({
        success:true,
        message:"Welcome to the Protected route for TEST",
    });
})

router.get("/student", auth, isStudent, (req,res) => {
    res.json({
        success:true,
        messgae:"Welcome to the Protected route for Students",
    });
});

router.get("/admin",auth, isAdmin, (req, res) => {
    res.json({
        success:true,
        message:"Welcome to the Protected route for Admin",
    })
})

router.get('/getUser', auth, async (req, res) => {
    try{
        const id = req.user.id;
        const user = await User.findById(id);
        res.status(200).json({
            success:true,
            user:user,
            id:id,
            message:"Welcome to the Protected User route"
        })
    }
    catch(error){
        console.log(error);
            return res.status(500).json({
                success: false,
                error:error.message,
                message: "Failed to fetch User",
            });

    }   
})

module.exports = router;