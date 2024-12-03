import { getNumberOfDays } from "./formatDate";

export function formatNumber(num: any) {
  if (typeof num === "string") {
    num = Number(num);
  }
  return num.toLocaleString();
}

export function calculatePrice(price: any, startDate: any, endDate: any) {
  const days = getNumberOfDays(startDate, endDate);
  return days * price;
}

export function calculateSubtotal(cart: any) {
  let subtotal = 0;
  cart.forEach((product: any) => {
    subtotal += calculatePrice(
      product.item.price,
      product.selectedDates[0].startDate,
      product.selectedDates[0].endDate
    );
  });
  return subtotal;
}
