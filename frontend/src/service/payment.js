import axios from "axios";

const API = axios.create({
  baseURL: "https://skymart-e-commerce.onrender.com/api/web",
});

export const createPaymentOrder = async (amount) => {
  const { data } = await API.post("/payment/create-order", {
    amount,
  });

  return data;
};

export const verifyPayment = async (paymentData) => {
  const { data } = await API.post("/payment/verify", paymentData);

  return data;
};
