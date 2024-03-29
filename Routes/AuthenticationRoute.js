const router = require("express").Router();
const userModel = require("../Models/UsersSchema");


//Registration

router.post("/register", async (req, res) => {
    try {
      const user = new userModel({
        username:req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      await user.save();
      res.status(200).json({
        status: "success",
        user,
      });
    } catch (err) {
      res.status(500).json({
        status: "failed",
        message: err,
      });
    }
});
  

//Login
router.post("/login", async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        res.status(404).json({
          status: "failed",
          message: "user email not found",
        });
      } else {
        if (user.password !== req.body.password) {
          res.status(400).json({
            status: "failed",
            message: "Invalid Password",
          });
        } else {
          res.status(200).json({
            status: "success",
            user,
          });
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;