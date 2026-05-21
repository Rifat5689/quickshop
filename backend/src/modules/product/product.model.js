import mongoose from "mongoose"

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },

  public_id: {
    type: String,
    required: true
  }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title : String , 
  subtitle : String ,

  description: {
    type: String,
    trim: true
  },
  slug: {
  type: String,
  required: true,
  unique: true,
  lowercase: true
},

  price: {
    type: Number,
    required: true
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false
  },

  images: {
    type: [imageSchema],
    default: []
  },

  stock: {
    type: Number,
    default: 0
  },

  discount: {
    type: Number,
    default: 0 
  },

  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });
const Product = mongoose.model("Product",productSchema) ; 
export default Product ;
