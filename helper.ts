import axios from "axios";

export const ApiEnd = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_ENDPOINT,
});

export const fetcherWc = async (
  url: string,
  method: string,
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
export const fetcher = async (url: string, method: string, data?: any) =>
  ApiEnd({
    url,
    method,
    data,
  }).then((response) => response.data);
