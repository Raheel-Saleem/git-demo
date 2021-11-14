import React from 'react';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import NavGroup from './NavGroup';
import menuItem from './../../../../menu-items';

import { useSelector } from 'react-redux';
//-----------------------|| SIDEBAR MENU LIST ||-----------------------//

const MenuList = () => {
    const permission = useSelector((state) => state.auth.permission);
    let filteredArray = [];
    if (permission.accounts) {
        filteredArray.push(menuItem.items[0]);
    }
    if (permission.purchase) {
        filteredArray.push(menuItem.items[1]);
    }
    if (permission.sale) {
        filteredArray.push(menuItem.items[2]);
    }
    if (permission.super) {
        filteredArray.push(menuItem.items[3]);
    }
    if (permission.construction) {
        filteredArray.push(menuItem.items[4]);
    }
    const navItems = filteredArray.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return navItems;
};

export default MenuList;
