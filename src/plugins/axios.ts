import axios, { AxiosInstance } from "axios";

let $axios: AxiosInstance;

export function initializeAxios() {
  $axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Replace with your base URL
    // You can also add other default configuration options here
  });
}

export { $axios };
