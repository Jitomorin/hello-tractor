import React from "react";

const ProgressBar = ({ status }: any) => {
  let progressColor;
  let progressWidth;

  switch (status) {
    case "pending":
      progressColor = "bg-yellow-300";
      progressWidth = "25%"; // Example width for pending
      break;
    case "processing":
      progressColor = "bg-blue-300";
      progressWidth = "50%"; // Example width for processing
      break;
    case "completed":
      progressColor = "bg-green-300";
      progressWidth = "100%"; // Example width for completed
      break;
    default:
      progressColor = "bg-gray-300";
      progressWidth = "0%"; // No progress for unknown status
  }

  return (
    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full ${progressColor}`}
        style={{ width: progressWidth }}
      ></div>
    </div>
  );
};

export default ProgressBar;
