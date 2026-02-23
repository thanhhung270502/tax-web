import { RouteKey } from "../enums";

export const ClientAPIRoutes = {
  /**
   * Profile Handler
   */
  PROFILE_HANDLER: {
    baseRoute: () => "/api/profile-handler",
  },
};

export const ClientRoutes: Record<RouteKey, string> = {
  [RouteKey.HOME]: "/home",
  [RouteKey.LOGIN]: "/login",
  [RouteKey.PROFILE]: "/profile",
};

export const PUBLIC_ROUTE_KEYS: RouteKey[] = [RouteKey.LOGIN, RouteKey.PROFILE];
