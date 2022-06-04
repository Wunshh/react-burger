import * as api from '../../utils/api';
import { setCookie } from '../../utils/cookie';
import { AppDispatch, AppThunk, TUser } from '../../utils/types';

const USER_FORM_SET_VALUE: 'USER_FORM_SET_VALUE' = 'USER_FORM_SET_VALUE';
const GET_USER_DATA_SUCCESS: 'GET_USER_DATA_SUCCESS' = 'GET_USER_DATA_SUCCESS';
const GET_USER_DATA_REQUEST: 'GET_USER_DATA_REQUEST' = 'GET_USER_DATA_REQUEST';
const GET_USER_DATA_FAILED: 'GET_USER_DATA_FAILED' = 'GET_USER_DATA_FAILED';
const UPDATE_USER_DATA_REQUEST: 'UPDATE_USER_DATA_REQUEST' = 'UPDATE_USER_DATA_REQUEST';
const UPDATE_USER_DATA_SUCCESS: 'UPDATE_USER_DATA_SUCCESS' = 'UPDATE_USER_DATA_SUCCESS';
const UPDATE_USER_DATA_FAILED: 'UPDATE_USER_DATA_FAILED' = 'UPDATE_USER_DATA_FAILED';
const RESET_USER_DATA_FAILED: 'RESET_USER_DATA_FAILED' = 'RESET_USER_DATA_FAILED';
const USER_LOGOUT: 'USER_LOGOUT' = 'USER_LOGOUT';

export interface ICatchUserDataErrAction {
    readonly type: typeof GET_USER_DATA_FAILED
}

export interface ICatchUserUpdateErrAction {
    readonly type: typeof UPDATE_USER_DATA_FAILED
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_DATA_SUCCESS;
    readonly res: TUser
}


export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_DATA_REQUEST;
}
export interface ISetUserFormValueAction {
    readonly type: typeof USER_FORM_SET_VALUE;
    field: string;
    value: string
}

export interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_DATA_REQUEST
} 

export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_DATA_SUCCESS;
    readonly res: TUser
} 

export interface IResetUserDataFaildAction {
    readonly type: typeof RESET_USER_DATA_FAILED;
}

export interface IUserLogout {
    readonly type: typeof USER_LOGOUT;
}

export type TUserAction = 
| ISetUserFormValueAction
| ICatchUserDataErrAction
| ICatchUserUpdateErrAction
| IGetUserSuccessAction
| IGetUserRequestAction
| IUpdateUserRequestAction
| IResetUserDataFaildAction
| IUserLogout
| IUpdateUserSuccessAction


const setUserFormValue = (field: string, value: string): ISetUserFormValueAction => ({
    type: USER_FORM_SET_VALUE,
    field,
    value
});

const catchUserDataErr = ():ICatchUserDataErrAction => {
    return {
        type: GET_USER_DATA_FAILED
    };
}

const catchUserUpdateErr = ():ICatchUserUpdateErrAction => {
    return {
        type: UPDATE_USER_DATA_FAILED
    };
}

const getUserSuccessAction = ( res: TUser ):IGetUserSuccessAction => ({
    type: GET_USER_DATA_SUCCESS,
    res
});

const getUserRequestAction = (): IGetUserRequestAction => ({
    type: GET_USER_DATA_REQUEST,
});

const updateUserRequestAction = (): IUpdateUserRequestAction => ({
    type: UPDATE_USER_DATA_REQUEST
});

const updateUserSuccessAction = ( res: TUser ): IUpdateUserSuccessAction => ({
    type: UPDATE_USER_DATA_SUCCESS,
    res
})

const getUserData: AppThunk = () => {
    return function(dispatch: AppDispatch) {
        dispatch(getUserRequestAction());
        api.getUserData()
        .then((res) => {
            if (res) {
                dispatch(getUserSuccessAction(res.user));
            }
        })
        .catch((res) => {
            if (res.message === 'jwt expired') {
                dispatch(updateToken(getUserData()))
            } else {
                dispatch(
                    catchUserDataErr()
                );
                console.log(res);
            }
        });
    }
}

const updateToken: AppThunk = (afterRefresh: any) => {
 
    return function(dispatch: AppDispatch) {
        dispatch(getUserRequestAction());
        api.updateToken() 
        .then((res) => {
            localStorage.setItem('refreshToken', res.refreshToken); 
            setCookie('accessToken', res.accessToken, {});
            dispatch(afterRefresh);
        })
    }
}

const updateUserData: AppThunk = (name: string, email: string, password: string) => {
    return function(dispatch: AppDispatch) {
        dispatch(updateUserRequestAction());
        api.updateUserData(name, email, password) 
        .then((res) => {
            if (res) {
                dispatch(updateUserSuccessAction(res.user));
            } else {
                dispatch(
                    catchUserUpdateErr()
                );
            }
        })
        .catch((err) => {
            dispatch(
                catchUserUpdateErr()
            );
            console.log(err);
        })
    }
}

export {
    USER_FORM_SET_VALUE,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_FAILED,
    UPDATE_USER_DATA_REQUEST,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILED,
    RESET_USER_DATA_FAILED,
    USER_LOGOUT,
    setUserFormValue,
    getUserData,
    updateUserData
}