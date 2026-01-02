import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../services/api-client.js';

export const useApiFetch = (
  endpoint,
  {
    searchParams = {},
    options = {},
    parseResponse = (res) => res,
    onSuccess = () => {},
    onError = (_) => {},
  }
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await apiClient.get(endpoint, searchParams, options);
      setData(parseResponse(response));
      setError(null);
      onSuccess();
    } catch (error) {
      setError(error);
      setData(null);
      onError(error);
    } finally {
      setLoading(false);
    }
  }, [endpoint, searchParams, options, parseResponse, onSuccess, onError]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loading, reload: fetchData };
};
