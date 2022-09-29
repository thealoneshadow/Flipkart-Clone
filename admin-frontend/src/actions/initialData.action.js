/** @format */

import axios from "../helpers/axios";
import {
	initialDataConstants,
	categoryConstants,
	productConstants,
} from "./constants";
export const getInitialData = () => {
	return async (dispatch) => {
		const res = await axios.post("/initialdata");
		if (res.status === 200) {
			const { categories, products } = res.data;
			dispatch({
				type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
				payload: { categories },
			});
			dispatch({
				type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
				payload: { products },
			});
		} else {
			dispatch({
				type: initialDataConstants.GET_ALL_INITIAL_DATA_FAILURE,
				payload: { error: res.data.error },
			});
		}
	};
};
