import AddCircleIcon from '@material-ui/icons/AddCircle';
const icons = {
    AddCircleIcon
};
export const supper = {
    id: 'superGroup',
    title: 'Supper',
    type: 'group',
    children: [
        {
            id: 'add-society',
            title: 'Add Society Data',
            type: 'item',
            url: '/addsociety',
            icon: icons['AddCircleIcon']
            // breadcrumbs: false
        },
        {
            id: 'add-plot',
            title: 'Add Plot for Purchase',
            type: 'item',
            url: '/addplot',
            icon: icons['AddCircleIcon']
            // breadcrumbs: false
        }
    ]
};
