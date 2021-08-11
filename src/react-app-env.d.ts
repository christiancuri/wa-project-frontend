/// <reference types="react-scripts" />

declare global {
  declare var process: {
    env: {
      REACT_APP_API_BASE_URL: string;
      NODE_ENV: 'development' | 'production';
      REACT_APP_SESSION_KEY: string;
    };
  };
}
