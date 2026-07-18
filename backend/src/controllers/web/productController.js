import ProductModel from "../../models/product.model.js";

// GET ALL PRODUCTS

export const shopProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().populate("category");

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PRODUCT DETAILS

export const productDetails = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate(
      "category",
    );

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// SEARCH PRODUCT

export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    console.log("Search Query:", query);

    const allProducts = await ProductModel.find();

    console.log("All Products:", allProducts);

    const products = await ProductModel.find({
      $or: [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },

        {
          brand: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    });

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
