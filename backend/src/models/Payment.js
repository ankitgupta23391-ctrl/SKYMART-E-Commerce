import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    amount: Number,
    orderId: String,
    paymentId: String,
    status: {
      type: String,
      enum: ["created", "paid", "failed"], 
      default: "created",
    },
  },
  { timestamps: true },
);

const PaymentModel = mongoose.model("payment", paymentSchema);
export default PaymentModel;
