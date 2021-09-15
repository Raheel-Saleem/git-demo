import { dashboard } from './dashboard';
import { accounts } from './accounts';
import { purchase } from './purchase';
import { sale } from './sale';
import { supper } from './supper';

import { permissionArray } from '../utils/permissionArray';
//-----------------------|| MENU ITEMS ||-----------------------//
// let arr = [];

// // console.log('permission ary from menu', ...permissionArray);
// let signin = permissionArray[0];
// // console.log('hahahah', obj.accounts);
// let obj = {};
// if (signin) {
//     obj = permissionArray[1];
// } else {
//     obj = permissionArray[2];
// }
// console.log(obj);

// if (obj.accounts) {
//     arr.push(accounts);
// }
// if (obj.purchase) {
//     arr.push(purchase);
// }
// if (obj.sale) {
//     arr.push(sale);
// }
// if (obj.super) {
//     arr.push(supper);
// }

// console.log('menu item permission', ...arr);
const menuItems = {
    items: [accounts, purchase, sale, supper]
};

export default menuItems;
