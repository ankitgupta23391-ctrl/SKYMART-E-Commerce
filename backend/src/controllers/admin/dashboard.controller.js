import Order from "../../models/Order.js";
import ProductModel from "../../models/product.model.js";
import User from "../../models/User.js";


export const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({
      role: "user",
    });

    const totalProducts = await ProductModel.countDocuments();

    const totalOrders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
          orderStatus: {
            $ne: "Cancelled",
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
      },
    });
  } catch (error) {
    console.log("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
