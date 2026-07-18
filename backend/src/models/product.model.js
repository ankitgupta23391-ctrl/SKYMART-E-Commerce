import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      ref: "Category",
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    sku: {
      type: String,
      unique: true,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ProductModel= mongoose.model("Product", productSchema);

export default ProductModel;
