import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// dashboard routing
import PurchasePlots from '../views/pages/PurchasePlots/PurchasePlots.js';
import NotFound from '../views/pages/404Page/NotFound';
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// sample page routing
const SamplePage1 = Loadable(lazy(() => import('../views/sample-page/samplePage')));
const Society = Loadable(lazy(() => import('../views/pages/Socitey/Society.js')));
const Plot = Loadable(lazy(() => import('../views/pages/AddPlotPurchase/Plot.js')));
const Signup = Loadable(lazy(() => import('../views/pages/Accounts/SignUp/Signup.js')));
// const PurchasePlots = Loadable(lazy(() => import('../views/pages/PurchasePlots/PurchasePlots.js')));
//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();
    const permission = useSelector((state) => state.auth.permission);
    const pathArray = [];
    if (permission.accounts) {
        pathArray.push('/acounts/signup', '/acounts/users', '/acounts/details');
    }
    if (permission.purchase) {
        pathArray.push('/', '/purchase/summary');
    }
    if (permission.sale) {
        pathArray.push('/sale/plots', '/sale/summary');
    }
    if (permission.super) {
        pathArray.push('/addsociety', '/addplot');
    }
    return (
        <Route path={[...pathArray]}>
            <Switch location={location} key={location.pathname}>
                <MainLayout>
                    <Route path="/dashboard" component={DashboardDefault} />

                    <Route path="/" component={PurchasePlots} exact />
                    {permission.accounts && (
                        <>
                            <Route path="/acounts/signup" component={Signup} exact />
                        </>
                    )}
                    {permission.super && (
                        <>
                            <Route path="/addplot" component={Plot} exact />
                            <Route path="/addsociety" component={Society} exact />
                        </>
                    )}
                </MainLayout>
                {/* <Route component={NotFound} /> */}
            </Switch>
        </Route>
    );
};
export default MainRoutes;
