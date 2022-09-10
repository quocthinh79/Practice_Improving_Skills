import routesConfig from '~/config/routes';

import ReduxBasicPage from "../pages/ReduxBasic";
import HomePage from "../pages/Home";
import WeartherDataFeedPage from '~/pages/WeatherDataFeed';

const publicRoutes = [
    {path: routesConfig.home, page: HomePage},
    {path: routesConfig.reduxBasic, page: ReduxBasicPage},
    {path: routesConfig.dataFeedWeather, page: WeartherDataFeedPage}
]

const privateRoutes = []

export {publicRoutes, privateRoutes}
