import { config } from "../config";

const BASE_URL = config.apiUrl

async function request(method, endpoint, searchParams = {}, options = {}) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...options.headers,
    },
    ...options,
  };

  const params = new URLSearchParams(searchParams).toString();
  const response = await fetch(`${BASE_URL}${endpoint}?${params}`, config);

  const data = await response.json();

  if (!response.ok) {
    const error = {
      status: response.status,
      message: data?.message || response.statusText,
      data,
    };
    throw error;
  }

  return data;
}

export const apiClient = {
  get: (endpoint, searchParams, options = {}) => request('GET', endpoint, searchParams, options),
}