import "./App.css";
import { HashRouter as Router, Link, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import DefaultLayout from "./Layouts/DefaultLayout";
import React, { Suspense } from "react";

const Layout = React.lazy(() => import("./Layouts/DefaultLayout"));

function App() {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.page;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <DefaultLayout>
                      <Page />
                    </DefaultLayout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
