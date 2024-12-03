export const PaidPill = ({ isPaid }: { isPaid: boolean }) => {
  let bgColor, textColor, symbol;

  // Define colors and symbols based on isPaid prop
  if (isPaid) {
    bgColor = "bg-green-100";
    textColor = "text-green-800";
    symbol = "✔"; // Checkmark symbol
  } else {
    bgColor = "bg-red-100";
    textColor = "text-red-800";
    symbol = "✘"; // Cross symbol
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${bgColor} ${textColor}`}
    >
      {symbol} {isPaid ? "Paid" : "Not Paid"}
    </span>
  );
};
