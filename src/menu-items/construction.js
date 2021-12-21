import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
const icons = {
    SupervisorAccountIcon,
    AccountBoxIcon,
    HomeWorkIcon
};
export const construction = {
    id: 'constructionGroup',
    title: 'Construction',
    type: 'group',
    children: [
        {
            id: 'constructionCollapes',
            title: 'Construction',
            type: 'collapse',
            icon: icons['HomeWorkIcon'],
            children: [
                {
                    id: 'constructionaccount',
                    title: 'Construction Account',
                    type: 'item',
                    url: '/construction/account'
                },
                {
                    id: 'constructionaccountsummary',
                    title: 'Construction Account Summary',
                    type: 'item',
                    url: '/construction/accountSummary'
                },
                {
                    id: 'add-cunstrction-plot',
                    title: 'Add Construction Plot',
                    type: 'item',
                    url: '/construction/addplot'
                },
                {
                    id: 'cunstrction-plot-summary',
                    title: 'Construction Plot Summary',
                    type: 'item',
                    url: '/construction/plotSummary'
                },
                {
                    id: 'add-supplier',
                    title: 'Add Supplier',
                    type: 'item',
                    url: '/construction/supplier'
                },
                {
                    id: 'supplier-summary',
                    title: 'Supplier Summary',
                    type: 'item',
                    url: '/construction/supplierSummary'
                },
                {
                    id: 'purchase-product',
                    title: 'Purchase Product',
                    type: 'item',
                    url: '/construction/product'
                },
                {
                    id: 'product-summary',
                    title: 'Product Summary',
                    type: 'item',
                    url: '/construction/productSummary'
                },
                {
                    id: 'add-stock',
                    title: 'Add Stock',
                    type: 'item',
                    url: '/construction/stock'
                },
                {
                    id: 'stock-summary',
                    title: 'Stock Summary',
                    type: 'item',
                    url: '/construction/stockSummary'
                }
            ]
        }
    ]
};
