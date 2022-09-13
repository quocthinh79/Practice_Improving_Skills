import routesConfig from "~/config/routes";

import ReduxBasicPage from "../pages/ReduxBasic";
import HomePage from "../pages/Home";
import WeartherDataFeedPage from "~/pages/WeatherDataFeed";

const publicRoutes = [
  { path: routesConfig[0].path, page: HomePage },
  { path: routesConfig[1].path, page: ReduxBasicPage },
  { path: routesConfig[2].path, page: WeartherDataFeedPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
