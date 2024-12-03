import Axios from "axios";

export const createCheckout = async (
  fullName: any,
  email: any,
  amount: any,
  phone: any,
  url: any
) => {
  let data;
  await Axios.post("https://sandbox.intasend.com/api/v1/checkout/", {
    public_key: "ISPubKey_test_cd5109e1-16d5-4961-a2ab-9f459db4f908",
    first_name: fullName.split(" ")[0],
    last_name: fullName.split(" ")[1],
    email: email,
    phone_number: phone,
    host: "http://localhost:3000/dashboard/home",
    // redirect_url: url,
    amount: amount,
    currency: "KES",
  })
    .then((transaction: any) => {
      console.log("success", transaction);
      data = transaction.data;
    })
    .catch((error: any) => {
      console.log(error);
      console.log("sykeee");
      data = error;
    });
  return data;
};

export const checkTransactionStatus = async (
  bookingID: any,
  bookingSignature: any
) => {
  let result;
  await Axios.post("https://sandbox.intasend.com/api/v1/checkout/details/", {
    public_key: "ISPubKey_test_cd5109e1-16d5-4961-a2ab-9f459db4f908",
    checkout_id: bookingID,
    signature: bookingSignature,
  })
    .then((res: any) => {
      result = res.data;
      console.log("resuuult", result);
    })
    .catch((error: any) => {
      result = error;
    });
  return result;
};
