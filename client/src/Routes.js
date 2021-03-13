import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { getAuth } from "./helpers/functions";

import CustomPage from "./pages/CustomPage.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import HomePage from "./pages/HomePage";
import Page404 from "./pages/Page404";
import uuid from "react-uuid";
import TestPage from "./pages/TestPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import TreePage from "./pages/TreePage";
import PageTable from "./components/tables/PagesTable";
import UsersTable from "./components/tables/UsersTable";

function Routes({ pages }) {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      render={(props) =>
        getAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
      {...rest}
    />
  );

  const CustomRoutes = () => pages.map(createRoute);

  const createRoute = (page) => {
    const Page = () => <CustomPage page={page} />;
    const props = {
      exact: true,
      path: page.path,
      key: uuid(),
      component: Page,
    };
    return page.published ? <Route {...props} /> : <PrivateRoute {...props} />;
  };

  const PagesTable = () => <PageTable pages={pages} />;

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={AuthPage} />
      <Route exact path="/register" component={AuthPage} />
      {/* TEST */}
      <Route exact path="/test" component={TestPage} />
      <Route exact path="/tree" component={TreePage} />
      {/* ---- */}
      <PrivateRoute exact path="/logout" component={LogoutPage} />
      <PrivateRoute exact path="/profile" component={ProfilePage} />
      <PrivateRoute exact path="/pages" component={PagesTable} />
      <PrivateRoute exact path="/users" component={UsersTable} />
      <CustomRoutes />
      <Route path="*" component={Page404} />
    </Switch>
  );
}

export default Routes;
