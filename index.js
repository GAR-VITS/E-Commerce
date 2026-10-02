const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { connect } = require("./backend/config/dbConnect");
const  authRoute  = require("./backend/routes/auth");
const productRoute = require("./backend/routes/productRoute")
const orderRoute = require("./backend/routes/orderRoute");
const analyticsRoute = require('./backend/routes/analyticsRoute');
const cookieParser = require("cookie-parser");



connect(); // DB connected


const app = express();
// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000', 
  credentials: true,              
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.set("trust proxy", 1);



app.get("/", (req, res)=>{
    res.send("Hello From Server");
})


// Authorization Users
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/analytics', analyticsRoute);


const PORT = process.env.PORT || 8000
app.listen(PORT,  ()=>{
    console.log(`Server Started at http://localhost:${PORT}`);
})

