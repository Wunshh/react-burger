import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator , Dispatch} from 'redux';
import { store } from '../services/store/store';
import { TActions } from '../services/actions/wsActions';
import { TUserAction } from '../services/actions/user';
import { TResetAction } from '../services/actions/reset';
import { TRegistrationAction } from '../services/actions/registration';
import { TOrderAction } from '../services/actions/order';
import { TModalAction } from "../services/actions/modal";
import { TLoginAction } from "../services/actions/login";
import { TIngredientsAction } from "../services/actions/ingredients";
import { TForgotFormAction } from "../services/actions/forgotPassword";
import { TConstructorAction } from "../services/actions/constructor";
import { TWsState } from "../services/reducers/wsReduser";

export type TOrder = {
    name: string;   
    order: number;
    success: boolean
};

export type TIngredients = {
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly image_large: string;
    __v: number;
    num?: number;
    uuid?: string;
};


export type TLocation = {
    hash: string;
    pathname: string;
    search: string;
    state?: any
};

export type TForm = {
    email?: string;
    name?: string;
    password?: string;
    codeFromEmail?: string;
    token?: string; 
};

export type THeaders = {
    "Accept": string;
    "Content-Type": string;
    'Authorization'?: string; 
};

export type TApplicationActions = 
| TActions
| TUserAction
| TResetAction
| TRegistrationAction
| TOrderAction
| TModalAction
| TLoginAction
| TIngredientsAction
| TForgotFormAction
| TConstructorAction


export type AppDispatch = Dispatch<TApplicationActions>;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;


export type TOrders = {
    _id: string;
    ingredients: Array<string>;
    status: string;
    name: string;
    createdAt: string;
    number: number;
};

export type TListOrders = {
    success: boolean;
    orders: Array<TOrders>;
    total: number;
    totalToday: number;
}

export type TUser = {
    name: string;
    email: string;
}