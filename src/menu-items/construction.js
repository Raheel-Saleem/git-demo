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
                    id: 'add-cunstrction-plot',
                    title: 'Add Construction Plot',
                    type: 'item',
                    url: '/construction/addplot'
                },
                {
                    id: 'add-supplier',
                    title: 'Add Supplier',
                    type: 'item',
                    url: '/construction/supplier'
                },
                {
                    id: 'purchase-product',
                    title: 'Purchase Product',
                    type: 'item',
                    url: '/purchase/product'
                }
            ]
        }
    ]
};
