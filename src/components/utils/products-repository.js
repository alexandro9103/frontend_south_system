import axiosClient from "../../config/axios.config"

export const getPorductById = async (id) => {

    try {
        const resp = await axiosClient.get(`/get-product/${id}`);
        return resp.data.product;

    } catch (error) {
        console.log(error);
        return null;

    }

}