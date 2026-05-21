import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  { _id: false }
);

const pageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    slug: { type: String, required: true, unique: true, trim: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    status: { type: String, enum: ["Draft", "Live"], default: "Draft" },
    description: { type: String, default: "" },
    images: { type: [imageSchema], default: [] },

    viewsTotal: { type: Number, default: 0 },
    viewsToday: { type: Number, default: 0 },
    viewsMonth: { type: Number, default: 0 },
    lastViewedDate: { type: String, default: "" },
    lastViewedMonth: { type: String, default: "" },
  },
  { timestamps: true }
);

const Page = mongoose.model("Page", pageSchema);

export default Page;
