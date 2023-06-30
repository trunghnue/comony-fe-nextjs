import axios from "axios";

const headers = {
  [process.env.NEXT_PUBLIC_API_KEY_NAME!]: process.env.NEXT_PUBLIC_API_KEY_VALUE!,
  [process.env.NEXT_PUBLIC_FRONT_SERVER_KEY_NAME!]: process.env.NEXT_PUBLIC_FRONT_SERVER_KEY_VALUE!,
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Replace with your base URL
  headers,
  // You can also add other default configuration options here
});

export default axiosInstance;
