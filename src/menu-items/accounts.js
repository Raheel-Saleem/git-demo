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
                    // icon: icons['AccountBoxIcon'],
                    url: '/signup'
                    // target: true
                },
                {
                    id: 'see-users-profile',
                    title: 'See Users Profile',
                    type: 'item',
                    // icon: icons['AccountBoxIcon'],
                    url: '/users'
                    // target: true
                },
                {
                    id: 'add-acc-details',
                    title: 'Add Accounts Detail',
                    type: 'item',
                    // icon: icons['AccountBoxIcon'],
                    url: '/accouts/details'
                    // target: true
                },
                {
                    id: 'sp',
                    title: 'Sample',
                    type: 'item',
                    // icon: icons['AccountBoxIcon'],
                    url: '/sp'
                    // target: true
                }
            ]
        }
    ]
};
