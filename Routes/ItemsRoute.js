const router = require("express").Router();
const itemModel = require("../Models/ItemsSchema");

//create  a post

router.post("/create", async (req, res) => {
    try {
      const newItem = new itemModel(req.body);
      await newItem.save();
      res.status(200).json(newItem);
    } catch (err) {
      res.status(500).json(err);
    }
});


//update  a post
router.put("/update/:id", async (req, res) => {
      try {
        const updatedItem = await itemModel.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        const item = await itemModel.findById(updatedItem._id)
        res.status(200).json(item);
      } catch (err) {
        res.status(500).json(err);
      }
});

//delete  a post

router.delete("/delete/:id", async (req, res) => {
    const item = await itemModel.findById(req.params.id);
    if (req.body.isAdmin) {
      try {
        const updatedItem = await itemModel.findByIdAndDelete(item._id);
        res.status(200).json("Post Deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("Only ADMIN can delete items");
    }
});
  


//get one item

router.get("/item/:id", async (req, res) => {
    try {
      const item = await itemModel.findById(req.params.id);
      res.status(200).json(item);
    } catch (err) {
      res.status(500).json(err);
    }
});

//get all item

router.get("/itemall", async (req, res) => {
    try {
      const items = await itemModel.find({status:"Available"});
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json(err);
    }
});


module.exports =  router;