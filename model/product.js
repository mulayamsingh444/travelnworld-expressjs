const mongoose = require('mongoose');


// Schema
const productSchema = new mongoose.Schema({
    title : {type: String, required: [true, "Title is required"], unique: [true, "Title should be unique"]},
    description : String,
    price : {type: Number, min: [1, 'Price should not be below 1'], required: [true, "Price is required"]},
    discountPercentage : {type: Number,default: 0, min: [0, "discount can't be less than 0%"], max: [90, "discount can't be above 90%"]},
    stock : {type: Number, required: [true, "Stock is required"], min: [1, "Stock can't be less than 1"]},
    brand : {type: String, required: [true, "Brand is required"]},
    category : {type: String, required: [true, "Category is required"]},
    thumbnail : {type: String, required: [true, "Thumbnail is required"]},
    quantity: {
      type: Number,
      default: 1
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }]
  });

const Product = mongoose.model('Product', productSchema);

module.exports = {Product}