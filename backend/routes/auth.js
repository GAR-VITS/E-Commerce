const express = require("express");
const router = express.Router();
const {registerUser, loginUser, getAllUsers, logout} = require("../controller/auth");
const  {access, authorize } = require("../middleware/authService");
const { verifyOTP, resendOTP } = require("../utils/otpGeneration");

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/users',access, authorize ,getAllUsers);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);

router.get('/me', access, async(req, res) => {
    try{
        // console.log(req.user);
       res.status(200).json({
       success: true,
       user: req.user
      });
    }
    catch(error){
        console.log("Get User Error", error);
        res.status(500).json({message: "Internal Server Error"});
    }   
});




module.exports = router;