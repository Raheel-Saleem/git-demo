import { LOGIN, LOGOUT } from './authConstant';
import { startLoading, stopLoading } from '../actions';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import history from '../../historty';
import { Redirect } from 'react-router';
import { permissionArray } from '../../utils/permissionArray';

export const signin = (payload) => {
    return {
        type: LOGIN,
        user: payload.user,
        permission: payload.permission
    };
};

export const login = (data) => async (dispatch) => {
    try {
        dispatch(startLoading());

        let response = await axios.post('http://127.0.0.1:5000/login', { ...data });

        let token = response.data[0];
        var decoded = jwt_decode(token);
        let user = {};
        user.id = decoded.id;
        user.username = decoded.username;
        user.role = decoded.role;
        let permission = {};
        permission.accounts = decoded.Accounts;
        permission.purchase = decoded.Purchase;
        permission.sale = decoded.Sale;
        permission.super = decoded.Supper;

        let payload = { user, permission };

        permissionArray.push(permission);
        dispatch(signin(payload));
        // history.push('/');
        <Redirect to="/" />;
        dispatch(stopLoading());
    } catch (error) {
        console.log(error);
        dispatch(stopLoading());
    }
};
