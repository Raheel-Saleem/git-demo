import { LOGIN, LOGOUT } from './authConstant';
import { startLoading, stopLoading } from '../actions';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import history from '../../historty';
import { Redirect } from 'react-router';
import { permissionArray } from '../../utils/permissionArray';
import { setToken } from '../../utils/token';
import server from '../../server/server';
import swal from 'sweetalert';

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

        setToken(token);
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
        // console.log('before', permissionArray);
        // permissionArray[0].isSignedIn = true;
        // permissionArray.push(permission);
        // permissionArray[0].purchase = permission.purchase;
        // permissionArray[0].sale = permission.sale;
        // permissionArray[0].super = permission.super;

        console.log('after', permissionArray);

        dispatch(signin(payload));
        history.push('/');
        // <Redirect to="/" />;
        dispatch(stopLoading());
    } catch (error) {
        console.log(error);
        dispatch(stopLoading());
    }
};

export const logout = () => {
    return {
        type: LOGOUT
    };
};

export const signup = (data) => async (dispatch) => {
    try {
        dispatch(startLoading());
        console.log('before send signup req data', data);
        const response = await server.post('/signup', data);
        // const response = await axios.post('http://127.0.0.1:5000/signup', { data });

        console.log(response.data);
        dispatch(stopLoading());
        swal('Congrats!', 'User Added Succesfully!', 'success');
    } catch (error) {
        dispatch(stopLoading());
        swal('Oopps!', 'user email,phone,cnic may already exist or invalid !', 'error');

        console.log(error.response);
    }
};
