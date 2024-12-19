# Stocks (WIP)

A stocks application that enables users to track their personal stock portfolios, manage watchlists, and analyse market data effectively.

The markets view enables users to gauge overall market sentiment and monitor the performance of different sectors. They can also create and manage their personal watchlists, adding or removing stocks of interest.

Selecting a stock opens a detailed view with in-depth information about the stock and company behind it, including:

- Company details: name, industry, sector, website, description, etc.
- Stock metrics: real-time quote (price, change, open, high, low, close), volume, P/E ratio, market cap, yield, beta, EPS, etc.
- Price chart displaying intra-day and historical price movements.
- Company-specific news and events.

The screener enables users to search, sort and filter stocks to find those that fit their own search criteria, like trading volume, market capitalisation, P/E ratio, etc.
This feature also highlights market top gainers and losers for quick insights.

The application consists of a React + Vite frontend and a Node.js + Express server.

On the frontend, I use TailwindCSS for styling, TanStack Router for client-side navigation, TanStack Query for server state management and Socket.IO for real-time updates.

The Express API exposes useful endpoints for managing watchlists, accessing stock screeners, retrieving company profiles, generating price charts, and fetching news. Socket.IO, Redis and PostgreSQL enable real-time bidirectional event-based communication between the client and the server.
