import { TIngredients } from '../../utils/types'; 

const ADD_ITEM: 'ADD_ITEM' = 'ADD_ITEM';
const DELETE_ITEM: 'DELETE_ITEM' = 'DELETE_ITEM';
const MOVE_ITEM: 'MOVE_ITEM' = 'MOVE_ITEM';

export interface IAddItemAction {
    readonly type: typeof ADD_ITEM;
    constructorIngredients: ReadonlyArray<TIngredients>;
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


export const addItemAction = (constructorIngredients: ReadonlyArray<TIngredients>): IAddItemAction => ({
    type: ADD_ITEM,
    constructorIngredients
});

export const deleteItemAction = (id: string): IDeleteItemAction => ({
    type: DELETE_ITEM,
    id
});

export const moveItemAction = (newCards: ReadonlyArray<TIngredients>): IMoveItemAction => ({
    type: MOVE_ITEM,
    newCards
});

export {
    ADD_ITEM,
    DELETE_ITEM,
    MOVE_ITEM
}