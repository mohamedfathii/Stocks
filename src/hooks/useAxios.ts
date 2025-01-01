import { useMemo } from 'react';
import type { AxiosError, CreateAxiosDefaults } from 'axios';
import axios from 'axios';
import { useAlert } from '../contexts/AlertContext';

interface ErrorMessage {
  status: number;
  message: string;
  type: 'error' | 'warning';
}

const DEFAULT_ERROR_MESSAGES: ErrorMessage[] = [
  { status: 429, message: 'Rate limit exceeded. Please try again later.', type: 'warning' },
  { status: 401, message: 'Authentication failed. Please check your API key.', type: 'error' },
  { status: 404, message: 'Resource not found.', type: 'warning' },
];

export const useAxios = (config: CreateAxiosDefaults, errorMessages = DEFAULT_ERROR_MESSAGES) => {
  const { showAlert } = useAlert();

  return useMemo(() => {
    const instance = axios.create(config);

    instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const status = error.response?.status;
        const errorConfig = errorMessages.find((msg) => msg.status === status);

        if (errorConfig) {
          showAlert(errorConfig.message, errorConfig.type);
        } else {
          showAlert(`An error occurred: ${error.message}`, 'error');
        }

        return Promise.reject(error);
      },
    );

    return instance;
  }, [showAlert, config, errorMessages]);
};
