const router = require('express').Router();
const { status } = require('express/lib/response');
const itemModel = require('../Models/ItemsSchema');
const userModel = require('../Models/UsersSchema');

router.put("/bid/:id",async(req,res)=>{
    const item = await itemModel.findById(req.params.id);
    const user = await userModel.find({username :req.body.username});
    try {
        console.log(user)
        if(user._id != null){
            res.status(401).json("no user mentionned or doesn't exist")
        }else{
            if(req.body.price > item.price+100){
                if(item.status=="Available"){
                    var updatedItem = await itemModel.findByIdAndUpdate(req.params.id, {
                        $set: req.body,
                    });
                    updatedItem = await itemModel.findByIdAndUpdate(updatedItem._id,{
                        $set : {
                            LastBet : req.body.username
                        }
                    })
                    const item = await itemModel.findById(updatedItem._id)
                    res.status(200).json(item);
                }else{
                    res.status(410).json("Unavailable Item!")
                }
                
            }else{
                res.status(409).json("the indicated price must be higher !!")
            }
        }
        
      } catch (err) {
        res.status(500).json(err);
      }
});

router.put('/biddingEnd/:id',async(req,res)=>{
    var item = await itemModel.findById(req.params.id);
    //const user = await userModel.find({username :req.body.username});

    try {
        
        if(item.LastBet !="" && item.status =="Available"){
            
            const updatedItem = await itemModel.findByIdAndUpdate(item._id, {
                $set: {
                    status : "Unavailable"
                },
            });
            await userModel.findOneAndUpdate({username : updatedItem.LastBet},{$push : {items : updatedItem}});
            const userdata = await userModel.findOne({username : updatedItem.LastBet})
            console.log(userdata)
            var item = await itemModel.findById(updatedItem._id)
            res.status(200).json({
                sold : 'item sold successfully',
                price :item.price,
                itemName : item.name,
                userdata
            });
        
            
        }else{
            //add when done with more important stuff
            res.status(500).json("item already sold or expired")
        }
    
        
    } catch (err) {
    res.status(500).json(err);
    }

})




module.exports = router ;