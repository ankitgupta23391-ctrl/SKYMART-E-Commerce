import Order from "../../models/Order.js";
import mongoose from "mongoose";

// CREATE ORDER

export const createOrder = async (req, res) => {
  try {
    const {
      user,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus,
    } = req.body;

    if (!user || !products || products.length === 0 || !totalAmount) {
      return res.status(400).json({
        success: false,

        message: "Order data is missing",
      });
    }

    const order = await Order.create({
      user,

      products,

      totalAmount,

      shippingAddress,

      paymentMethod: paymentMethod || "COD",

      paymentStatus:
        paymentMethod === "ONLINE" ? paymentStatus || "Paid" : "Pending",
    });

    const populatedOrder = await Order.findById(order._id)

      .populate("user", "name email")

      .populate({
        path: "products.productId",

        select: "name brand price discountPrice image images",
      });

    res.status(201).json({
      success: true,

      message: "Order placed successfully",

      order: populatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// GET ALL ORDERS

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()

      .populate("user", "name email")

      .populate({
        path: "products.productId",

        select: "name brand price discountPrice image images",
      })

      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,

      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// GET USER ORDERS

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.params.userId,
    })

      .populate({
        path: "products.productId",

        select: "name brand price discountPrice image images",
      })

      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,

      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// UPDATE ORDER STATUS

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatus = [
      "Pending",

      "Processing",

      "Shipped",

      "Delivered",

      "Cancelled",
    ];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,

        message: "Invalid order status",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,

        message: "Order not found",
      });
    }

    order.orderStatus = status;

    await order.save();

    res.status(200).json({
      success: true,

      message: "Order status updated successfully",

      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// DELETE ORDER

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,

        message: "Order not found",
      });
    }

    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,

      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// GET SINGLE ORDER DETAILS

export const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("ORDER ID :", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,

        message: "Invalid Order ID",
      });
    }

    const order = await Order.findById(id)

      .populate("user", "name email")

      .populate({
        path: "products.productId",

        select: "name brand price discountPrice image images",
      });

    console.log("ORDER DATA :", order);

    if (!order) {
      return res.status(404).json({
        success: false,

        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,

      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
