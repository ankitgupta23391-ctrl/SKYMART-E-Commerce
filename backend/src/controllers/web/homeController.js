import CategoryModel from "../../models/category.model.js";
import ProductModel from "../../models/product.model.js";


export const homeData = async (req, res) => {
  const featured = await ProductModel.find({
    featured: true,
  });

  const latest = await ProductModel.find().sort({
    createdAt: -1,
  });

  const categories = await CategoryModel.find();

  res.json({
    success: true,
    featured,
    latest,
    categories,
  });
};