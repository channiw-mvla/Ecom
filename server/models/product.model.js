const mongoose = require('mongoose');
 
const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [3, "Name must be at least 3 characters long"]
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        rating: {
            type: Number,
            default: 0
        },
        numOrders: {
            type: Number,
            default: 0
        },
        stock: {
            type: Number,
            default: 0
        },
        images: {
            type: [String],
            required: true
        },
        sizes: {
            type: [String],
        },
        colors: {
            type: [String],
        }
    },
    {
        timestamps:true
    }
);
 
const Product = mongoose.model('Product', ProductSchema);
 
module.exports = Product;
