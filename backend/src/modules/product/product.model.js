import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    description: { type: String, default: "" },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    url: { type: String, default: "" },
    language: { type: String, enum: ["bn", "en"], default: "bn" },
    status: { type: String, enum: ["Draft", "Live"], default: "Draft" },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    images: { type: [imageSchema], default: [] },
    stock: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    viewsTotal: { type: Number, default: 0 },
    viewsToday: { type: Number, default: 0 },
    viewsMonth: { type: Number, default: 0 },
    lastViewedDate: { type: String, default: "" },
    lastViewedMonth: { type: String, default: "" },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
