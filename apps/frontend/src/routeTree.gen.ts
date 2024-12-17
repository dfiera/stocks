/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as LayoutRouteImport } from './routes/_layout/route'
import { Route as IndexImport } from './routes/index'
import { Route as LayoutScreenerImport } from './routes/_layout/screener'
import { Route as LayoutMarketsImport } from './routes/_layout/markets'
import { Route as LayoutAuthImport } from './routes/_layout/_auth'
import { Route as LayoutStocksSymbolImport } from './routes/_layout/stocks/$symbol'
import { Route as LayoutAuthProfileImport } from './routes/_layout/_auth/profile'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const LayoutRouteRoute = LayoutRouteImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const LayoutScreenerRoute = LayoutScreenerImport.update({
  id: '/screener',
  path: '/screener',
  getParentRoute: () => LayoutRouteRoute,
} as any)

const LayoutMarketsRoute = LayoutMarketsImport.update({
  id: '/markets',
  path: '/markets',
  getParentRoute: () => LayoutRouteRoute,
} as any)

const LayoutAuthRoute = LayoutAuthImport.update({
  id: '/_auth',
  getParentRoute: () => LayoutRouteRoute,
} as any)

const LayoutStocksSymbolRoute = LayoutStocksSymbolImport.update({
  id: '/stocks/$symbol',
  path: '/stocks/$symbol',
  getParentRoute: () => LayoutRouteRoute,
} as any)

const LayoutAuthProfileRoute = LayoutAuthProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => LayoutAuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutRouteImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/_layout/_auth': {
      id: '/_layout/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutAuthImport
      parentRoute: typeof LayoutRouteImport
    }
    '/_layout/markets': {
      id: '/_layout/markets'
      path: '/markets'
      fullPath: '/markets'
      preLoaderRoute: typeof LayoutMarketsImport
      parentRoute: typeof LayoutRouteImport
    }
    '/_layout/screener': {
      id: '/_layout/screener'
      path: '/screener'
      fullPath: '/screener'
      preLoaderRoute: typeof LayoutScreenerImport
      parentRoute: typeof LayoutRouteImport
    }
    '/_layout/_auth/profile': {
      id: '/_layout/_auth/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof LayoutAuthProfileImport
      parentRoute: typeof LayoutAuthImport
    }
    '/_layout/stocks/$symbol': {
      id: '/_layout/stocks/$symbol'
      path: '/stocks/$symbol'
      fullPath: '/stocks/$symbol'
      preLoaderRoute: typeof LayoutStocksSymbolImport
      parentRoute: typeof LayoutRouteImport
    }
  }
}

// Create and export the route tree

interface LayoutAuthRouteChildren {
  LayoutAuthProfileRoute: typeof LayoutAuthProfileRoute
}

const LayoutAuthRouteChildren: LayoutAuthRouteChildren = {
  LayoutAuthProfileRoute: LayoutAuthProfileRoute,
}

const LayoutAuthRouteWithChildren = LayoutAuthRoute._addFileChildren(
  LayoutAuthRouteChildren,
)

interface LayoutRouteRouteChildren {
  LayoutAuthRoute: typeof LayoutAuthRouteWithChildren
  LayoutMarketsRoute: typeof LayoutMarketsRoute
  LayoutScreenerRoute: typeof LayoutScreenerRoute
  LayoutStocksSymbolRoute: typeof LayoutStocksSymbolRoute
}

const LayoutRouteRouteChildren: LayoutRouteRouteChildren = {
  LayoutAuthRoute: LayoutAuthRouteWithChildren,
  LayoutMarketsRoute: LayoutMarketsRoute,
  LayoutScreenerRoute: LayoutScreenerRoute,
  LayoutStocksSymbolRoute: LayoutStocksSymbolRoute,
}

const LayoutRouteRouteWithChildren = LayoutRouteRoute._addFileChildren(
  LayoutRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof LayoutAuthRouteWithChildren
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/markets': typeof LayoutMarketsRoute
  '/screener': typeof LayoutScreenerRoute
  '/profile': typeof LayoutAuthProfileRoute
  '/stocks/$symbol': typeof LayoutStocksSymbolRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof LayoutAuthRouteWithChildren
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/markets': typeof LayoutMarketsRoute
  '/screener': typeof LayoutScreenerRoute
  '/profile': typeof LayoutAuthProfileRoute
  '/stocks/$symbol': typeof LayoutStocksSymbolRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_layout': typeof LayoutRouteRouteWithChildren
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/_layout/_auth': typeof LayoutAuthRouteWithChildren
  '/_layout/markets': typeof LayoutMarketsRoute
  '/_layout/screener': typeof LayoutScreenerRoute
  '/_layout/_auth/profile': typeof LayoutAuthProfileRoute
  '/_layout/stocks/$symbol': typeof LayoutStocksSymbolRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/login'
    | '/register'
    | '/markets'
    | '/screener'
    | '/profile'
    | '/stocks/$symbol'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/login'
    | '/register'
    | '/markets'
    | '/screener'
    | '/profile'
    | '/stocks/$symbol'
  id:
    | '__root__'
    | '/'
    | '/_layout'
    | '/login'
    | '/register'
    | '/_layout/_auth'
    | '/_layout/markets'
    | '/_layout/screener'
    | '/_layout/_auth/profile'
    | '/_layout/stocks/$symbol'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LayoutRouteRoute: typeof LayoutRouteRouteWithChildren
  LoginRoute: typeof LoginRoute
  RegisterRoute: typeof RegisterRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LayoutRouteRoute: LayoutRouteRouteWithChildren,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_layout",
        "/login",
        "/register"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_layout": {
      "filePath": "_layout/route.tsx",
      "children": [
        "/_layout/_auth",
        "/_layout/markets",
        "/_layout/screener",
        "/_layout/stocks/$symbol"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/_layout/_auth": {
      "filePath": "_layout/_auth.tsx",
      "parent": "/_layout",
      "children": [
        "/_layout/_auth/profile"
      ]
    },
    "/_layout/markets": {
      "filePath": "_layout/markets.tsx",
      "parent": "/_layout"
    },
    "/_layout/screener": {
      "filePath": "_layout/screener.tsx",
      "parent": "/_layout"
    },
    "/_layout/_auth/profile": {
      "filePath": "_layout/_auth/profile.tsx",
      "parent": "/_layout/_auth"
    },
    "/_layout/stocks/$symbol": {
      "filePath": "_layout/stocks/$symbol.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
