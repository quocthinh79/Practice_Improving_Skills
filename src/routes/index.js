import routesConfig from '~/config/routes';

import ReduxBasicPage from "../pages/ReduxBasic";
import HomePage from "../pages/Home";

const publicRoutes = [
    {path: routesConfig.home, pages: HomePage},
    {path: routesConfig.reduxBasic, pages: ReduxBasicPage}
]

const privateRoutes = []

export {publicRoutes, privateRoutes}
