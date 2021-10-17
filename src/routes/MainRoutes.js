import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// dashboard routing
import PurchasePlots from '../views/pages/PurchasePlots/PurchasePlots.js';
import UserTable from '../views/pages/Accounts/UserTable/UserTable';
import PartnerAcc from '../views/pages/Accounts/PartnerAccDetails/PartnerAcc';
import AdminAcc from '../views/pages/Accounts/AdminAccDetails/AdminDetails';
import NotFound from '../views/pages/404Page/NotFound';
import AccountForm from '../views/pages/Accounts/AccountForm/Account';
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// sample page routing
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
        pathArray.push('/acounts/signup', '/acounts/users', '/acounts/partneracc', '/acounts/form', '/acounts/adminacc');
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
                            <Route path="/acounts/users" component={UserTable} />
                            <Route path="/acounts/partneracc" component={PartnerAcc} />
                            <Route path="/acounts/adminacc" component={AdminAcc} />

                            <Route path="/acounts/open/:id" component={AccountForm} />
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
