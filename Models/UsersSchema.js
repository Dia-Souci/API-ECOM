const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema(
  {
    username: {
      type: String,
      min: 8,
      max: 20,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 75,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    items:{
      type : Array,
      default : []
    }
},
  { timestamps: true }
);

module.exports = Mongoose.model("User", userSchema);