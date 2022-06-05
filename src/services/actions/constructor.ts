import { TIngredients } from '../../utils/types'; 

const ADD_ITEM: 'ADD_ITEM' = 'ADD_ITEM';
const DELETE_ITEM: 'DELETE_ITEM' = 'DELETE_ITEM';
const MOVE_ITEM: 'MOVE_ITEM' = 'MOVE_ITEM';

export interface IAddItemAction {
    readonly type: typeof ADD_ITEM;
    readonly item: TIngredients;
    readonly uuid: string;
}

export interface IDeleteItemAction {
    readonly type: typeof DELETE_ITEM;
    readonly id: string;
}

export interface IMoveItemAction {
    readonly type: typeof MOVE_ITEM;
    readonly newCards: ReadonlyArray<TIngredients>;
}

export type TConstructorAction =
| IAddItemAction
| IDeleteItemAction
| IMoveItemAction

export {
    ADD_ITEM,
    DELETE_ITEM,
    MOVE_ITEM
}