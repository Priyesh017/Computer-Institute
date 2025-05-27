import axios from "axios";

export const ApiEnd = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_ENDPOINT,
});

type MType = "GET" | "PUT" | "POST" | "DELETE";

export const fetcherWc = async (
  url: string,
  method: MType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
) =>
  ApiEnd({
    url,
    method,
    data,
    withCredentials: true,
  }).then((response) => response.data);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetcher = async (url: string, method: MType, data?: any) =>
  ApiEnd({
    url,
    method,
    data,
  }).then((response) => response.data);
