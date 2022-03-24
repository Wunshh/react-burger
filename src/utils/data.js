import PropTypes from 'prop-types';

const selectedIngridients = [
   {
      "_id":"60666c42cc7b410027a1a9b9",
      "name":"Соус традиционный галактический",
      "type":"sauce",
      "proteins":42,
      "fat":24,
      "carbohydrates":42,
      "calories":99,
      "price":15,
      "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
      "__v":0
   },
   {
      "_id":"60666c42cc7b410027a1a9b4",
      "name":"Мясо бессмертных моллюсков Protostomia",
      "type":"main",
      "proteins":433,
      "fat":244,
      "carbohydrates":33,
      "calories":420,
      "price":1337,
      "image":"https://code.s3.yandex.net/react/code/meat-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
      "__v":0
   },
   {
      "_id":"60666c42cc7b410027a1a9bc",
      "name":"Плоды Фалленианского дерева",
      "type":"main",
      "proteins":20,
      "fat":5,
      "carbohydrates":55,
      "calories":77,
      "price":874,
      "image":"https://code.s3.yandex.net/react/code/sp_1.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png",
      "__v":0
   },
       {
       "_id":"60666c42cc7b410027a1a9b1",
       "name":"Краторная булка N-200i",
       "type":"bun",
       "proteins":80,
       "fat":24,
       "carbohydrates":53,
       "calories":420,
       "price":1255,
       "image":"https://code.s3.yandex.net/react/code/bun-02.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
       "__v":1
    },
    {
      "_id":"60666c42cc7b410027a1a9bb",
      "name":"Хрустящие минеральные кольца",
      "type":"main",
      "proteins":808,
      "fat":689,
      "carbohydrates":609,
      "calories":986,
      "price":300,
      "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
      "__v":0
   },
   {
      "_id":"60666c42cc7b410027a1a9bb",
      "name":"Хрустящие минеральные кольца",
      "type":"main",
      "proteins":808,
      "fat":689,
      "carbohydrates":609,
      "calories":986,
      "price":300,
      "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
      "__v":0
   },
   {
      "_id":"60666c42cc7b410027a1a9bb",
      "name":"Хрустящие минеральные кольца",
      "type":"main",
      "proteins":808,
      "fat":689,
      "carbohydrates":609,
      "calories":986,
      "price":300,
      "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
      "__v":0
   },
   {
      "_id":"60666c42cc7b410027a1a9bd",
      "name":"Кристаллы марсианских альфа-сахаридов",
      "type":"main",
      "proteins":234,
      "fat":432,
      "carbohydrates":111,
      "calories":189,
      "price":762,
      "image":"https://code.s3.yandex.net/react/code/core.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/core-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/core-large.png",
      "__v":0
   },
   {
      "_id":"60666c42cc7b410027a1a9bd",
      "name":"Кристаллы марсианских альфа-сахаридов",
      "type":"main",
      "proteins":234,
      "fat":432,
      "carbohydrates":111,
      "calories":189,
      "price":762,
      "image":"https://code.s3.yandex.net/react/code/core.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/core-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/core-large.png",
      "__v":0
   }
]

const desctopHeight = 820;
const menuMobileHeight = 620;
const mainHeight = 260;
const selectedHeight = 460;

const modalRoot = document.getElementById("react-modals"); 
const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';

const dataPropTypes = PropTypes.shape({
   "_id": PropTypes.string.isRequired,
   "name": PropTypes.string.isRequired,
   "type": PropTypes.string.isRequired,
   "proteins": PropTypes.number.isRequired,
   "fat": PropTypes.number.isRequired,
   "carbohydrates": PropTypes.number.isRequired,
   "calories": PropTypes.number.isRequired,
   "price": PropTypes.number.isRequired,
   "image": PropTypes.string.isRequired,
   "image_mobile": PropTypes.string.isRequired,
   "image_large": PropTypes.string.isRequired,
   "__v": PropTypes.number.isRequired
});

export {
   desctopHeight,
   menuMobileHeight,
   mainHeight,
   selectedHeight,
   selectedIngridients,
   dataPropTypes,
   modalRoot,
   BASE_URL
}


