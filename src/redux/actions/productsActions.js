import {
    GET_PRODUCTS,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    FIND_PRODUCTS
} from "./types";


import axiosClient from "../../config/axios.config";
import Swal from "sweetalert2";

export const findProductsAction = (name, from, limit) => async (dispatch) => {
    try {

        const products = await axiosClient.get(`/find-products/${name}/${from}/${limit}`);
        console.log(products.data);
        //return;
        dispatch({
            type: FIND_PRODUCTS,
            payload: {
                products: products.data.products,
                totalFound: products.data.total
            },
        });


    } catch (error) {
        console.log(error);
    }
};
export const getProductsAction = (from, limit) => async (dispatch) => {
    try {
        const products = await axiosClient.get(`/get-products/${from}/${limit}`);
        dispatch({
            type: GET_PRODUCTS,
            payload: {
                products: products.data.products,
                total: products.data.total
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const addProductAction = (product) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const resp = await axiosClient.post("/create-product", product, { headers: { token } });

        console.log(resp.data.product);
        if (resp.data.product) {
            dispatch({
                type: ADD_PRODUCT,
                payload: {
                    product: resp.data.product,
                },
            });
            Swal.fire("Parabéns!", "O produto foi cadastrado com sucesso!", "success");
        }

    } catch (error) {
        console.log(error);
    }
};

export const deleteProductAction = (id) => async (dispatch) => {
    try {

        const token = localStorage.getItem('token');
        const resp = await axiosClient.delete(`/delete-product/${id}`, {
            headers: { token }
        });

        if (resp.data.product) {
            dispatch({
                type: DELETE_PRODUCT,
                payload: {
                    id
                },
            });
            return true
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false
    }
};

export const updateProductAction = (id, product) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const resp = await axiosClient.put(`/update-product/${id}`, product, { headers: { token } });


        if (resp.data.product) {

            dispatch({
                type: UPDATE_PRODUCT,
                payload: {
                    id,
                    product,
                },
            });

            Swal.fire("Parabéns!", "O produto foi atualizado com sucesso!", "success");

        }

    } catch (error) {
        console.log(error);
    }
};

export const getProduct = async (id) => {
    try {
        const resp = await axiosClient.get(`/get-product/${id}`);
        return resp.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};