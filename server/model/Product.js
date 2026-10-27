const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0, min: 0 },
  brand: { type: String, default: "GoCart" },
  category: { type: String, default: "electronics", index: true }
}, { timestamps: true });
productSchema.index({ name: "text", brand: "text", description: "text" });
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports = { Product };
