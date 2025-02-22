import axios from "axios";

interface iDatatype {
  email?: string;
  name?: string;
  password?: string;
}

const ApiEnd = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_ENDPOINT,
});

export const fetcherWc = async (
  url: string,
  method: string,
  data?: iDatatype
) =>
  ApiEnd({
    url,
    method,
    data,
    withCredentials: true,
  }).then((response) => response.data);

export const fetcher = async (url: string, method: string, data?: iDatatype) =>
  ApiEnd({
    url,
    method,
    data,
  }).then((response) => response.data);
