const jwt  = require("jsonwebtoken");

async function generateToken(userData){
     const { name, email, role} = userData;
       const payload = {
           userId: userData._id,
           username: name,
           emailId: email,
           role: role
       }
       return await jwt.sign(payload, process.env.secret, {expiresIn: '10d'});
}

module.exports = {generateToken};