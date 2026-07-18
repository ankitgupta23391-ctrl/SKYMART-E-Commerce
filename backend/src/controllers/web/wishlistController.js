
import ProductModel from "../../models/product.model.js";
import Wishlist from "../../models/Wishlist.js";

// Add Product to Wishlist

export const addToWishlist = async (req, res) => {
  try {
    const { user, product } = req.body;

    if (!user || !product) {
      return res.status(400).json({
        success: false,
        message: "User and Product are required",
      });
    }

    const productExists = await ProductModel.findById(product);

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let wishlist = await Wishlist.findOne({ user });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user,
        products: [product],
      });
    } else {
      if (wishlist.products.includes(product)) {
        return res.status(400).json({
          success: false,
          message: "Product already exists in wishlist",
        });
      }

      wishlist.products.push(product);
      await wishlist.save();
    }

    res.status(201).json({
      success: true,
      message: "Product added to wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Wishlist

export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findOne({ user: userId })
      .populate("user", "name email")
      .populate("products");

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Product

export const removeWishlistItem = async (req, res) => {
  try {
    const { user, product } = req.body;

    const wishlist = await Wishlist.findOne({ user });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== product
    );

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Clear Wishlist

export const clearWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.products = [];

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Wishlist cleared successfully",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Wishlist

export const deleteWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    await Wishlist.findOneAndDelete({ user: userId });

    res.status(200).json({
      success: true,
      message: "Wishlist deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};