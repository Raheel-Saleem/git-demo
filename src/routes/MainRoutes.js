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
// import NotFound from '../views/pages/404Page/NotFound';
import AccountForm from '../views/pages/Accounts/AccountForm/Account';
import AddPartnerToPlot from '../views/add-partner-to-a-plot/ChekoutMain';
import SellPlot from '../views/pages/SellPlot';
import DetailePropertyPage from '../views/DetailePropertyPage';
import ConstructionAccount from '../views/pages/Construction/Account/Account';
import ConstructionAddPlot from '../views/pages/Construction/AddPlot/AddPlot';
import ConstructionProduct from '../views/pages/Construction/Product/Product';
import ConstructionStock from '../views/pages/Construction/Stock/Stock';
import ConstructionSupplier from '../views/pages/Construction/Supplier/Supplier';
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
        pathArray.push('/', '/purchase/summary', '/addPartnerToPlot/:societyName/:sectorNo/:plotNo');
    }
    if (permission.sale) {
        pathArray.push('/sale/plots', '/sale/summary');
    }
    if (permission.super) {
        pathArray.push('/addsociety', '/addplot');
    }
    if (permission.construction) {
        pathArray.push(
            '/construction/account',
            '/construction/addplot',
            '/construction/supplier',
            '/construction/product',
            '/construction/stock'
        );
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
                    {permission.purchase && (
                        <>
                            <Route path="/addPartnerToPlot/:societyName/:sectorNo/:plotNo" exact component={AddPartnerToPlot} />
                            <Route path="/propertyDetail/:id" exact component={DetailePropertyPage} />
                        </>
                    )}
                    {permission.sale && (
                        <>
                            <Route path="/sellPlot/:societyName/:sectorNo/:plotNo" exact component={SellPlot} />
                        </>
                    )}
                    {permission.super && (
                        <>
                            <Route path="/addplot" component={Plot} exact />
                            <Route path="/addsociety" component={Society} exact />
                        </>
                    )}
                    {permission.construction && (
                        <>
                            <Route path="/construction/account" component={ConstructionAccount} exact />

                            <Route path="/construction/addplot" component={ConstructionAddPlot} exact />
                            <Route path="/construction/product" component={ConstructionProduct} exact />
                            <Route path="/construction/stock" component={ConstructionStock} exact />
                            <Route path="/construction/supplier" component={ConstructionSupplier} exact />
                        </>
                    )}
                </MainLayout>
                {/* <Route component={NotFound} /> */}
            </Switch>
        </Route>
    );
};
export default MainRoutes;
