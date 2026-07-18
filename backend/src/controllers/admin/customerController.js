import User from "../../models/User.js";
import Order from "../../models/Order.js"


// Get All Customers


export const allCustomers = async (req, res) => {
  try {
    const users = await User.find({
      role: "user",
    }).select("-password");

    const customers = await Promise.all(
      users.map(async (user) => {
        const orders = await Order.find({
          user: user._id,
        });

        const totalOrders = orders.length;

        const totalSpent = orders.reduce(
          (sum, order) => sum + order.totalAmount,
          0,
        );

        const lastOrder =
          orders.length > 0
            ? orders.sort((a, b) => b.createdAt - a.createdAt)[0].createdAt
            : null;

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          profileImage: user.profileImage,
          orders: totalOrders,
          spent: totalSpent,
          lastOrder,
          status: user.isBlocked ? "Inactive" : "Active",
          isBlocked: user.isBlocked,
          createdAt: user.createdAt,
        };
      }),
    );

    res.status(200).json({
      success: true,
      customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Single Customer


export const singleCustomer = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const orders = await Order.find({
      user: user._id,
    });

    const totalOrders = orders.length;

    const totalSpent = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );

    const lastOrder =
      orders.length > 0
        ? orders.sort((a, b) => b.createdAt - a.createdAt)[0].createdAt
        : null;

    res.status(200).json({
      success: true,
      customer: {
        ...user.toObject(),
        orders: totalOrders,
        spent: totalSpent,
        lastOrder,
        status: user.isBlocked ? "Inactive" : "Active",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Block / Unblock Customer


export const updateCustomerStatus = async (req, res) => {
  try {
    const { isBlocked } = req.body;

    const customer = await User.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    customer.isBlocked = isBlocked;

    await customer.save();

    res.status(200).json({
      success: true,
      message: isBlocked
        ? "Customer blocked successfully"
        : "Customer unblocked successfully",
      customer: {
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        isBlocked: customer.isBlocked,
        status: customer.isBlocked ? "Inactive" : "Active",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Customer


export const deleteCustomer = async (req, res) => {
  try {
    const customer = await User.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    
    await Order.deleteMany({
      user: customer._id,
    });

    
    await User.findByIdAndDelete(customer._id);

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

