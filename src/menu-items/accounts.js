import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
const icons = {
    SupervisorAccountIcon,
    AccountBoxIcon
};
export const accounts = {
    id: 'accountsGroup',
    title: 'Accounts',
    type: 'group',
    children: [
        {
            id: 'accountsCollapes',
            title: 'Accounts',
            type: 'collapse',
            icon: icons['SupervisorAccountIcon'],
            children: [
                {
                    id: 'signup',
                    title: 'Sign Up',
                    type: 'item',
                    url: '/acounts/signup'
                },
                {
                    id: 'see-users-profile',
                    title: 'See Users Profile',
                    type: 'item',
                    url: '/acounts/users'
                },
                {
                    id: 'add-acc-details',
                    title: 'Partner Account Detail',
                    type: 'item',
                    url: '/acounts/partneracc'
                },
                {
                    id: 'admin-acc-details',
                    title: 'Admin Account Detail',
                    type: 'item',
                    url: '/acounts/adminacc'
                },
                {
                    id: 'acc-summary',
                    title: 'Account Summary',
                    type: 'item',
                    url: '/acounts/accountSummary'
                }
            ]
        }
    ]
};
