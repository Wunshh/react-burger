import { AnyAction } from 'redux'; 
import { initialState } from './reducers';
import { ingredient } from './reducers';

import {
    ORDER_MODAL_OPEN,
    INGREDIENT_MODAL_OPEN,
    ORDER_INGREDIENT_MODAL_OPEN,
    MODAL_CLOSE,
    TModalAction
} from '../actions/modal';

import {
    GET_INGREDIENTS_SUCCESS,
    TIngredientsAction
} from '../actions/ingredients';

import {
    SEND_ORDER_SUCCESS,
    SEND_ORDER_REQUEST,
    SEND_ORDER_FAILED,
    TOrderAction
} from '../actions/order';

import {
    ADD_ITEM,
    DELETE_ITEM,
    MOVE_ITEM,
    TConstructorAction
} from '../actions/constructor';

describe('Тест forgotPasswordFormReducer', () => {

    const allIngredients = [
        {
            calories: 14,
            carbohydrates: 11,
            fat: 22,
            image: "https://code.s3.yandex.net/react/code/sauce-04.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
            name: "Соус фирменный Space Sauce",
            price: 80,
            proteins: 50,
            type: "sauce",
            uuid: "19842efa-f757-48bf-bc10-f69035d79382",
            __v: 0,
            _id: "60d3b41abdacab0026a733cd",
        },
        {
            calories: 643,
            carbohydrates: 85,
            fat: 26,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            name: "Флюоресцентная булка R2-D3",
            price: 988,
            proteins: 44,
            type: "bun",
            __v: 0,
            _id: "60d3b41abdacab0026a733c7"
        },
        {
            _id: "60d3b41abdacab0026a733d1",
            name: "Плоды Фалленианского дерева",
            type: "main",
            proteins: 20,
            fat: 5,
            carbohydrates: 55,
            calories: 77,
            price: 874,
            image: "https://code.s3.yandex.net/react/code/sp_1.png",
            image_large: "https://code.s3.yandex.net/react/code/sp_1-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
            __v: 0,
            uuid: "3d1cffce-c1f4-4b52-9def-dc469be0c555",
        },
        {
            calories: 100,
            carbohydrates: 100,
            fat: 99,
            image: "https://code.s3.yandex.net/react/code/sauce-01.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
            name: "Соус с шипами Антарианского плоскоходца",
            price: 88,
            proteins: 101,
            type: "sauce",
            uuid: "5197fe46-8d39-4a4d-a727-4a011b68d314",
            __v: 0,
            _id: "60d3b41abdacab0026a733cf"
        }
    ];

    it('Вернуть initialState', () => {
        expect(ingredient(undefined, {} as AnyAction)).toEqual(initialState);
    });

    it('Проверить GET_INGREDIENTS_SUCCESS', () => {
        expect(ingredient({
            ...initialState
        }, {
            type: GET_INGREDIENTS_SUCCESS,
            allIngredients
        })).toEqual({
            ...initialState,
            allIngredients
        })
    });

    // it('Проверить ADD_ITEM', () => {
    //     expect(ingredient({
    //         ...initialState,
    //         constructorIngredients: []
    //     }, {
    //         type: ADD_ITEM,
    //         item: [allIngredients[2]],
    //         uuid: [allIngredients[2].uuid]
    //     })).toEqual({
    //         ...initialState,
    //         constructorIngredients: [...item, uuid]
    //     })
    // });


})