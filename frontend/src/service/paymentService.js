import axios from "axios";

const API = "https://skymart-e-commerce.onrender.com/api/payment";

export const createOrder = async (amount) => {
  const { data } = await axios.post(`${API}/create-order`, {
    amount,
  });

  return data;
};

export const verifyPayment = async (paymentData) => {
  const { data } = await axios.post(
    `${API}/verify`,
    paymentData
  );

  return data;
};