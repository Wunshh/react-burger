import { TIngredients, TOrders} from '../../utils/types';

const ORDER_MODAL_OPEN: 'ORDER_MODAL_OPEN' = 'ORDER_MODAL_OPEN';
const INGREDIENT_MODAL_OPEN: 'INGREDIENT_MODAL_OPEN' = 'INGREDIENT_MODAL_OPEN';
const ORDER_INGREDIENT_MODAL_OPEN: 'ORDER_INGREDIENT_MODAL_OPEN' = 'ORDER_INGREDIENT_MODAL_OPEN'
const MODAL_CLOSE: 'MODAL_CLOSE' = 'MODAL_CLOSE';

export interface IOrderModalOpenAction {
    readonly type: typeof ORDER_MODAL_OPEN
}

export interface IIngredientModalOpenAction {
    readonly type: typeof INGREDIENT_MODAL_OPEN;
    readonly item: TIngredients
}

export interface IOrderIngtedientModalOpenAction {
    readonly type: typeof ORDER_INGREDIENT_MODAL_OPEN;
    readonly item: TOrders
}

export interface IModalCloseAction {
    readonly type: typeof MODAL_CLOSE
}

export type TModalAction = 
| IOrderModalOpenAction
| IIngredientModalOpenAction
| IOrderIngtedientModalOpenAction
| IModalCloseAction


export {
    ORDER_MODAL_OPEN,
    INGREDIENT_MODAL_OPEN,
    ORDER_INGREDIENT_MODAL_OPEN,
    MODAL_CLOSE
}