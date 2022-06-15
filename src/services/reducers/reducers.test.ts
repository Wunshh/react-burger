import { AnyAction } from 'redux'; 
import { initialState } from './reducers';
import { ingredient } from './reducers';

import {
    ORDER_MODAL_OPEN,
    INGREDIENT_MODAL_OPEN,
    ORDER_INGREDIENT_MODAL_OPEN,
    MODAL_CLOSE
} from '../actions/modal';

import {
    GET_INGREDIENTS_SUCCESS,
} from '../actions/ingredients';

import {
    SEND_ORDER_SUCCESS,
    SEND_ORDER_REQUEST,
    SEND_ORDER_FAILED
} from '../actions/order';

import {
    ADD_ITEM,
    DELETE_ITEM,
    MOVE_ITEM
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

    const order = {
        name: "Space флюоресцентный бургер",
        order: {        
            createdAt: "2022-06-15T19:50:41.755Z",
            ingredients: [allIngredients[0]],
            name: "Space флюоресцентный бургер",
            number: 17726,
            owner: {name: 'Валентинa', email: 'test@test.ru', createdAt: '2022-04-30T10:57:49.108Z', updatedAt: '2022-06-12T11:34:52.275Z'},
            price: 1068,
            status: "done",
            updatedAt: "2022-06-15T19:50:42.099Z",
            _id: "62aa3811fa747e001bd527ea"
        },
        success: true
    };

    const orderIngredient = {
        _id: "62aa3aa9fa747e001bd527fd",
        ingredients: [
            "60d3b41abdacab0026a733cc"
        ],
        status: "done",
        name: "Астероидный био-марсианский краторный spicy экзо-плантаго бургер",
        createdAt: "2022-06-15T20:01:45.147Z",
        updatedAt: "2022-06-15T20:01:45.442Z",
        number: 17735
    };


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

    it('Проверить ADD_ITEM', () => {
        expect(ingredient({
            ...initialState,
            constructorIngredients: []
        }, {
            type: ADD_ITEM,
            item: allIngredients[1],
            uuid: "5197fe46-8d39-4a4d-a727-4a011b68d314"
        })).toEqual({
            ...initialState,
            constructorIngredients: [
                ...initialState.constructorIngredients, 
                allIngredients[1]
            ]
        })
    });

    it('Проверить DELETE_ITEM', () => {
        expect(ingredient({
            ...initialState,
            constructorIngredients: [allIngredients[0], allIngredients[3]],
        }, {
            type: DELETE_ITEM,
            id: allIngredients[0]._id
        })).toEqual({
            ...initialState,
            constructorIngredients: [allIngredients[3]]
        })
    });

    it('Проверить MOVE_ITEM', () => {
        expect(ingredient({
            ...initialState,
            constructorIngredients: [allIngredients[1], allIngredients[2], allIngredients[3]],
        }, {
            type: MOVE_ITEM,
            newCards: [allIngredients[3], allIngredients[2]]
        })).toEqual({
            ...initialState,
            constructorIngredients: [allIngredients[1], allIngredients[3], allIngredients[2]]
        })
    });

    it('Проверить SEND_ORDER_REQUEST', () => {
        expect(ingredient(initialState, {
            type: SEND_ORDER_REQUEST
        })).toEqual({
            ...initialState,
            orederRequest: true,
            orderFailed: false
        })
    });

    it('Проверить SEND_ORDER_SUCCESS', () => {
        expect(ingredient({
            ...initialState
        }, {
            type: SEND_ORDER_SUCCESS,
            order
        })).toEqual({
            ...initialState, 
            order,
            orederRequest: false,
            orderFailed: false
        })
    });

    it('Проверить SEND_ORDER_FAILED', () => {
        expect(ingredient(initialState, {
            type: SEND_ORDER_FAILED,
        })).toEqual({
            ...initialState,
            orederRequest: false,
            orderFailed: true
        })
    });

    it('Проверить ORDER_MODAL_OPEN', () => {
        expect(ingredient(initialState, {
            type: ORDER_MODAL_OPEN,
        })).toEqual({
            ...initialState,
            orderModalOpen: true
        })
    });

    it('Проверить MODAL_CLOSE', () => {
        expect(ingredient(initialState, {
            type: MODAL_CLOSE,
        })).toEqual({
            ...initialState,
            order: null,
            orederRequest: false,
            orderFailed: false,
            orderIngredientModalOpen: false,
            ingredient: null,
            ingredientModalOpen: false,
            orderIngredient: null,
        })
    });

    it('Проверить INGREDIENT_MODAL_OPEN', () => {
        expect(ingredient(initialState, {
            type: INGREDIENT_MODAL_OPEN,
            item: allIngredients[3]
        })).toEqual({
            ...initialState,
            ingredientModalOpen: true,
            ingredient: allIngredients[3]
        });
    });

    it('Проверить ORDER_INGREDIENT_MODAL_OPEN', () => {
        expect(ingredient(initialState, {
            type: ORDER_INGREDIENT_MODAL_OPEN,
            item: orderIngredient
        })).toEqual({
            ...initialState,
            orderIngredientModalOpen: true,
            orderIngredient: orderIngredient
        })
    });
});