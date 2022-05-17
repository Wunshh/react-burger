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