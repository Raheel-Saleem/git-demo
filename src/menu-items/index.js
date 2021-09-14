import { dashboard } from './dashboard';
import { accounts } from './accounts';
import { purchase } from './purchase';
import { sale } from './sale';
import { supper } from './supper';

import { permissionArray } from '../utils/permissionArray';
//-----------------------|| MENU ITEMS ||-----------------------//
let arr = [];
console.log('permission ary from menu', permissionArray);
if (permissionArray.accounts) {
    arr.push(accounts);
}
if (permissionArray.purchase) {
    arr.push(purchase);
}
if (permissionArray.sale) {
    arr.push(sale);
}
if (permissionArray.super) {
    arr.push(supper);
}
console.log('menu item permissions', arr);
const menuItems = {
    items: [accounts, purchase, sale, supper]
};

export default menuItems;
