import AddCircleIcon from '@material-ui/icons/AddCircle';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
const icons = {
    AddCircleIcon,
    TrackChangesIcon
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
            // breadcrumbs: true
        },
        {
            id: 'add-plot',
            title: 'Add Plot for Purchase',
            type: 'item',
            url: '/addplot',
            icon: icons['AddCircleIcon']
            // breadcrumbs: false
        },
        {
            id: 'see-add-plot',
            title: ' See Added Plots',
            type: 'item',
            url: '/seeaddplot',
            icon: icons['TrackChangesIcon']
            // breadcrumbs: false
        }
    ]
};
