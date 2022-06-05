import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator , Dispatch} from 'redux';
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
import { TReducersState } from "../services/reducers/reducers";
import { TRegistrationState } from "../services/reducers/registrationReducer";
import { TLoginState } from "../services/reducers/loginReducer";
import { TResetState } from "../services/reducers/resetReduser";
import { TForgotPasswordState } from "../services/reducers/forgotPasswordReducer";
import { TUserState } from "../services/reducers/userReduser";

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

export type TUser = {
    name?: string;
    email?: string;
}

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
export type RootState = {
    ingredient: TReducersState;
    registrationFormReducer: TRegistrationState;
    loginFormReducer: TLoginState;
    resetFormReducer: TResetState;
    forgotPasswordFormReducer: TForgotPasswordState;
    userDataReducer: TUserState;
    wsReduser: TWsState;
};

export type AppThunk<ReturnType = void> = ActionCreator<
ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export type TOrders = {
    ingredients: Array<string>;
    _id: string;
    name: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
};

export type TListOrders = {
    orders: Array<TOrders>;
    total: number;
    totalToday: number;
}
