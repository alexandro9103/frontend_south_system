import {
    GET_PRODUCTS,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    FIND_PRODUCTS
} from "../actions/types";

const initialState = {
    products: [],
    total: 0,
    searchedProduct: []

};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload.products,
                total: action.payload.total
            };

        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload.product],
            };

        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(
                    (prod) => prod._id !== action.payload.id
                ),
                total: state.total - 1
            };

        case UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map((prod) =>
                    prod.id === action.payload.id ? (prod = action.payload.product) : prod
                ),
            };

        case FIND_PRODUCTS:
            return {
                ...state,
                searchedProduct: action.payload.products,
                totalFound: action.payload.totalFound
            }
        default:
            return state;
    }
};

export default productsReducer;