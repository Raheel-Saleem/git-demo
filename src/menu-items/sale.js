import StoreIcon from '@material-ui/icons/Store';
const icons = {
    StoreIcon
};
export const sale = {
    id: 'saleGroup',
    title: 'Sale',
    type: 'group',
    children: [
        {
            id: 'saleCollapes',
            title: 'Sale Plots',
            type: 'collapse',
            icon: icons['StoreIcon'],
            children: [
                {
                    id: 'sale-plots',
                    title: 'Sale Plots',
                    type: 'item',
                    // icon: icons['AccountBoxIcon'],
                    url: '/?plot=sell'
                    // target: true
                },
                {
                    id: 'sale-summary',
                    title: 'Sale Plots Summary',
                    type: 'item',
                    // icon: icons['AccountBoxIcon'],
                    url: '/sale-summary'
                    // target: true
                },
                {
                    id: 'profit-loss-summary',
                    title: 'Profit-Loss Summary',
                    type: 'item',
                    // icon: icons['AccountBoxIcon'],
                    url: '/sale-profit-loss'
                    // target: true
                },
                {
                    id: 'sale-token-plot',
                    title: 'Sale Token Plots',
                    type: 'item',
                    // icon: icons['AccountBoxIcon'],
                    url: '/sale-token-plot'
                    // target: true
                }
            ]
        }
    ]
};
