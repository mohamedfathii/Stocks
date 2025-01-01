export enum ApiStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ApiError {
  message: string;
  code?: string | number;
}

export interface ApiResponse<T> {
  status: ApiStatus;
  data?: T;
  error?: ApiError;
}
