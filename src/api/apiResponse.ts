export type ErrorLevel = 'Debug' | 'Info' | 'Warning' | 'Error' | 'Fatal';

export interface ApiMessage {
  errorLevel: ErrorLevel;
  code: number;
  description: string | null;
}

export interface ApiResponse<T> {
  responseCode: number;
  statusCode: number;
  messages: ApiMessage[];
  data: T | null;
}
