const Mongoose = require("mongoose");

const itemSchema = new Mongoose.Schema(
    {
        name: {
            type : String,
            required:true,
            min:4,
            unique : true,
            
        },
        price: {
            type : Number,
            required : true,
            default : 1000,
        },
        image:{
            type:String,
            default :""
        },
        status : {
            type : String,
            default : "Available",
        },
        Description : {
            type : String,
            min :12,
        },
        LastBet :{
            Type : String,
            default : ""
        },
        LifeCycle:{
            type:Number,
            default:2
        }

    },
    { timestamps: true }
);

module.exports = Mongoose.model("Item", itemSchema);