import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import NotFound from '../views/pages/404Page/NotFound';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// project imports
import config from './../config';
import { useSelector } from 'react-redux';
//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
    const isSignedIn = useSelector((state) => state.auth.isSignedIn);
    return (
        <Switch>
            {isSignedIn ? <MainRoutes /> : <AuthenticationRoutes />}
            {/* <Redirect to="*" component={NotFound} /> */}
        </Switch>
    );
};

export default Routes;
