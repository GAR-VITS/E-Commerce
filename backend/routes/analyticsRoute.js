const express = require("express");
const router = express.Router();
const {getAnalyticsData, getUsers, userRole} = require('../controller/analyticsController');
const {access, authorize} = require("../middleware/authService");

router.get("/", access, authorize, getAnalyticsData);
router.get("/users", access, authorize, getUsers);
router.put("/user/:id", access, authorize, userRole);


module.exports = router;