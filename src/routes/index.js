import routesConfig from "~/config/routes";

import ReduxBasicPage from "../pages/ReduxBasic";
import HomePage from "../pages/Home";
import WeartherDataFeedPage from "~/pages/WeatherDataFeed";
import Lab1Animation from "~/pages/Lab1Animation";

const publicRoutes = [
  { path: routesConfig[0].path, page: HomePage },
  { path: routesConfig[1].path, page: ReduxBasicPage },
  { path: routesConfig[2].path, page: WeartherDataFeedPage },
  { path: routesConfig[3].path, page: Lab1Animation },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
