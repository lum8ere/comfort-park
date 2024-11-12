import { DefaultLayout } from "modules/CommonPage/DefaultLayout";
import { Route, Routes } from "react-router-dom";
import { allRoutes as routes } from "routing/routes";

export const App: React.FC = () => {
  return (
    <DefaultLayout>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </DefaultLayout>
  );
};
