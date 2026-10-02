const jwt = require("jsonwebtoken");

async function access(req, res, next){
    try{
        //console.log("Middleware Accessed")
        const token = req.cookies['user'];
        if(!token){
            console.log("Token Not Found");
            return res.status(401).json({message: "Unauthorized Access1"});
        }
        const decoded = await jwt.verify(token, process.env.secret);
        req.user = {
        id: decoded.userId,
        name: decoded.username,
        email: decoded.emailId,
        role: decoded.role
       };
        //console.log(decoded);
        next();
    }
    catch(error){
        console.log("Access Error", error);
        return res.status(401).json({success: false, message: "Unauthorized: Session expired"});
    }
}

async function authorize(req, res, next){
    try{
        const {role} = req.user;
        if(role !== "admin") return res.status(403).json({message: "Forbidden Access"});
        next();
    }
    catch(error){
        console.log("Authorization Error", error);
        return res.status(403).json({message: "Forbidden Access"});
    }
}

module.exports = {access, authorize};