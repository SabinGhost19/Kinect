/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, useMemo } from 'react';
import { getItem, setItem } from '../utils/localStorage';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { customAxios } from '../utils/axiosFetchInstance';
const STALE_TIME = 5 * 60 * 1000; // 5 minutes

interface UseFetchProfileOptions extends AxiosRequestConfig {
  params?: Record<string, any>;
}

interface CachedData<T> {
  lastFetched: number;
  data: T;
}

const useFetchProfile = <T,>(url: string, options?: UseFetchProfileOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const abortControllerRef = useRef<AbortController | null>(null);

  const storageKey = useMemo(() => {
    if (!options?.params) {
      return url;
    }
    return url + '?' + JSON.stringify(options.params);
  }, [options, url]);

  useEffect(() => {
    const fetchData = async () => {
      const currentTime = new Date().getTime();
      const cachedData: CachedData<T> | null = getItem(storageKey);

      if (cachedData && currentTime - cachedData.lastFetched < STALE_TIME) {
        setData(cachedData.data);
        setIsLoading(false);
        return;
      }

      abortControllerRef.current = new AbortController();

      setError(null);
      setIsLoading(true);

      try {
        const response: AxiosResponse<T> = await customAxios.get(url, {
          ...options,
          signal: abortControllerRef.current?.signal,
        });
        setData(response.data);
      } catch (error: any) {
        console.log(error);
        setError('Something went wrong during the fetching data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [options, url, storageKey]);

  useEffect(() => {
    if (!data) return;

    setItem(storageKey, {
      lastFetched: new Date().getTime(),
      data,
    });
  }, [data, storageKey]);

  return { data, error, isLoading };
};

export default useFetchProfile;
