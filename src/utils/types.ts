import { store } from '../services/store/store';
import { TForgotPasswordState } from '../services/reducers/forgotPasswordReducer';
import { TLoginState } from '../services/reducers/loginReducer';
import { TReducersState } from '../services/reducers/reducers';
import { TRegistrationState} from '../services/reducers/registrationReducer';
import { TResetState} from '../services/reducers/resetReduser';
import { TUserState} from '../services/reducers/userReduser';
import { type } from 'os';

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

export type AppDispatch = typeof store.dispatch;
export type RootState = {
    ingredient: TReducersState;
    registrationFormReducer: TRegistrationState;
    loginFormReducer: TLoginState;
    resetFormReducer: TResetState;
    forgotPasswordFormReducer: TForgotPasswordState;
    userDataReducer: TUserState;
};