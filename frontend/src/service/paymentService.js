import axios from "axios";

const API = "http://localhost:3000/api/payment";

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