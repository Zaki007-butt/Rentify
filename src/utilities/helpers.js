import { BASE_URL } from "../config/config";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const getImageUrl = (path) => {
  if (path) {
    return `${BASE_URL}${path}`;
  } else {
    return "https://assets.entrepreneur.com/content/3x2/2000/20150622231001-for-sale-real-estate-home-house.jpeg?crop=16:9";
  }
};
