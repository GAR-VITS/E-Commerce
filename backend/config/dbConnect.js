const mongoose = require("mongoose");
const dns  = require("dns");
dns.setServers(['8.8.8.8','8.8.4.4', '1.1.1.1']);

async function connect(){
    try{
         await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully")
    }
    catch(error){
        console.log("MongoDB error:", error);
    }
}


module.exports = {connect};