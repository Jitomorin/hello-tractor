export const StatusPill = ({ status }: any) => {
  let bgColor, textColor;

  // Define colors based on status
  switch (status) {
    case "pending":
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
      break;
    case "processing":
      bgColor = "bg-blue-100";
      textColor = "text-blue-800";
      break;
    case "completed":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      break;
    default:
      bgColor = "bg-gray-100";
      textColor = "text-gray-800";
  }

  return (
    <span
      className={`inline-flex items-center mr-auto rounded-full px-2 py-1 text-xs font-medium ${bgColor} ${textColor}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Usage:
// <Badge status="pending" />
// <Badge status="processing" />
// <Badge status="completed" />
// <Badge status="other" />
