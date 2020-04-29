const express= require("express");
const router = express.Router();
router.get("/", (req,res)=> res.send("Router profile"));
module.exports = router;