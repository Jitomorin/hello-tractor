import { customAlphabet } from "nanoid";

export function processImageString(imageString: string) {
  if (imageString.includes("-jpg")) {
    // Remove "image-" and replace "-jpg" with ".jpg" for JPG images
    return imageString.replace("image-", "").replace("-jpg", ".jpg");
  } else if (imageString.includes("-png")) {
    // Remove "image-" and replace "-png" with ".png" for PNG images
    return imageString.replace("image-", "").replace("-png", ".png");
  } else {
    // If it's neither JPG nor PNG, return the original string
    return imageString;
  }
}

export function getMonthFromTimestamp(timestamp: number): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(timestamp);
  const monthIndex = date.getMonth(); // getMonth() returns a zero-based index (0-11)

  return months[monthIndex];
}

// Function to generate a slug based on the title
export function generateSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-");
}
export const getUser = (userID: any, users: any[]) => {
  const queriedUser = users.find((user: any) => user.uid === userID);
  return queriedUser;
};

export const getTimeSince = (timestamp: any) => {
  const oneDay = 24 * 60 * 60; // Number of seconds in a day
  const oneHour = 60 * 60; // Number of seconds in an hour
  const oneMinute = 60; // Number of seconds in a minute
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const difference = currentTimestamp - timestamp.seconds; // Difference between current timestamp and provided timestamp in seconds
  const daysDifference = Math.floor(difference / oneDay); // Convert difference to days
  const hoursDifference = Math.floor((difference % oneDay) / oneHour); // Convert remaining difference to hours
  const minutesDifference = Math.floor((difference % oneHour) / oneMinute); // Convert remaining difference to minutes
  const secondsDifference = difference % oneMinute; // Remaining difference is seconds

  if (daysDifference > 0) {
    if (daysDifference !== 1) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString(); // Return the date
    }
    return "Yesterday"; // Just for the case where it's just 1 day ago
  } else if (hoursDifference >= 5) {
    return new Date(timestamp.seconds * 1000).toLocaleTimeString(); // Return the time
  } else if (hoursDifference > 0) {
    if (hoursDifference !== 1) {
      return `${hoursDifference} hours ago`;
    }
    return `${hoursDifference} hour ago`;
  } else if (minutesDifference > 0) {
    if (minutesDifference !== 1) {
      return `${minutesDifference} minutes ago`;
    }
    return `${minutesDifference} minute ago`;
  } else {
    if (secondsDifference !== 1) {
      return "Less than one minute ago";
    }
    return "Just now";
  }
};

export const hasDatePassed = (timestampInSeconds: number): boolean => {
  const currentDateInSeconds = Math.floor(Date.now() / 1000);
  return currentDateInSeconds > timestampInSeconds;
};

export const generateConfirmationCode = () => {
  const nanoid = customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    6
  );

  const shortId = nanoid();
  return shortId;
};

export const setCSSVariable = (name: string, value: string) => {
  if (typeof window !== "undefined" && window?.document?.documentElement) {
    window.document.documentElement.style.setProperty(name, value);
  }
};
export const getLatestElement = (array: any[]) => {
  // Sort the array based on the timestamps in descending order
  const sortedArray = array.slice().sort((a, b) => b.timestamp - a.timestamp);
  // Return the first element, which will be the one with the latest timestamp
  return sortedArray[0];
};
export const getUrl = (router: any) => {
  const url = router.asPath;
  const pathSegments = url.split("/");
  const res = pathSegments[pathSegments.length - 1];
  return res;
};
export const isEmpty = (obj: any) => {
  return Object.keys(obj).length === 0;
};

export const isDateInRange = (startDate: any, endDate: any) => {
  const currentDate = new Date().getTime();
  // console.log("in function time", currentDate);
  return currentDate >= startDate && currentDate <= endDate;
};
