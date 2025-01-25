import 'express-session';

interface UserSession {
  id: string;
  email: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      MARKETS_DATA_API_URL: string;
      FMP_API_URL: string;
      FMP_API_KEY: string;
      AV_API_URL: string;
      AV_API_KEY: string;
      TD_API_URL: string;
      TD_API_KEY: string;
      POLYGON_API_URL: string;
      POLYGON_API_KEY: string;
      FINNHUB_API_URL: string;
      FINNHUB_API_KEY: string;
      STOCK_API_URL: string;
      POLL_INTERVAL: number;
      DATABASE_URL: string;
      REDIS_HOST: string;
      REDIS_PORT: number;
      REDIS_PASSWORD: string;
      SESSION_SECRET: string;
      COOKIE_DOMAIN: string;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      user: UserSession;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    user: UserSession;
  }
}
