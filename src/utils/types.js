import PropTypes from 'prop-types';

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

const orderPropTypes = PropTypes.shape({
    "name": PropTypes.string.isRequired,
    "order": PropTypes.objectOf(PropTypes.number),
    "success": PropTypes.bool
});

export {
    dataPropTypes,
    orderPropTypes
}
