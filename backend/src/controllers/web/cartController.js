import Cart from "../../models/Cart.js";
import ProductModel from "../../models/product.model.js";

// Add Product to Cart

export const addToCart = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;

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

    let cart = await Cart.findOne({ user });

    if (!cart) {
      cart = await Cart.create({
        user,
        products: [
          {
            product,
            quantity: quantity || 1,
          },
        ],
      });
    } else {
      const index = cart.products.findIndex(
        (item) => item.product.toString() === product
      );

      if (index > -1) {
        cart.products[index].quantity += quantity || 1;
      } else {
        cart.products.push({
          product,
          quantity: quantity || 1,
        });
      }

      await cart.save();
    }

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Cart

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId })
      .populate("user", "name email")
      .populate("products.product");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product Quantity

export const updateCart = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;

    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.products.find(
      (p) => p.product.toString() === product
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Product from Cart

export const removeCartItem = async (req, res) => {
  try {
    const { user, product } = req.body;

    const cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== product
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Clear Cart

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.products = [];

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Cart

export const deleteCart = async (req, res) => {
  try {
    const { userId } = req.params;

    await Cart.findOneAndDelete({ user: userId });

    res.status(200).json({
      success: true,
      message: "Cart deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};