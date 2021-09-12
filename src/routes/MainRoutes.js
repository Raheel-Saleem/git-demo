import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// dashboard routing
import PurchasePlots from '../views/pages/PurchasePlots/PurchasePlots.js';
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// sample page routing
const SamplePage1 = Loadable(lazy(() => import('../views/sample-page/samplePage')));
const Society = Loadable(lazy(() => import('../views/pages/Socitey/Society.js')));
const Plot = Loadable(lazy(() => import('../views/pages/Plotscreens/Plot.js')));
const Signup = Loadable(lazy(() => import('../views/pages/Accounts/SignUp/Signup.js')));
// const PurchasePlots = Loadable(lazy(() => import('../views/pages/PurchasePlots/PurchasePlots.js')));
//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();
    const permission = useSelector((state) => state.auth.permission);
    console.log('From Routes useSlector Permission', permission);
    const pathArray = [];

    return (
        <Route path={['/dashboard/default', '/sample-page', '/addsociety', '/addplot', '/', '/signup']}>
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    {/* <Route path="/dashboard/default" component={DashboardDefault} /> */}

                    <Route path="/addsociety" component={Society} />
                    <Route path="/addplot" component={Plot} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/" component={PurchasePlots} />
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
