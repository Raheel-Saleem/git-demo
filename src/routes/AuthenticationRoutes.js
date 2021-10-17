import React, { lazy } from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import Loadable from '../ui-component/Loadable';

// project imports
import MinimalLayout from './../layout/MinimalLayout';

// login option 3 routing
import NotFound from '../views/pages/404Page/NotFound';
const Login = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Register3')));

//-----------------------|| AUTHENTICATION ROUTING ||-----------------------//

const AuthenticationRoutes = () => {
    const location = useLocation();

    return (
        <Route path={['/']}>
            <Switch location={location} key={location.pathname}>
                <MinimalLayout>
                    <Route path="/" component={Login} />
                </MinimalLayout>
                {/* <Route path="/notfound" component={NotFound} /> */}
                {/* <Redirect to="*" component={NotFound} /> */}
            </Switch>
        </Route>
    );
};

export default AuthenticationRoutes;
