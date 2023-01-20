/** @format */

import axios from "../helpers/axios";
import { productConstants } from "../actions/constants";
export const getProductsBySlug = (slug) => {
	return async (dispatch) => {
		const res = await axios.get(`/products/${slug}`);
		if (res.status === 200) {
			dispatch({
				type: productConstants.GET_PRODUCTS_BY_SLUG,
				payload: res.data,
			});
		} else {
			// dispatch({
			// })
		}
	};
};

export const getProductsByCategory = (category) => {
	return async (dispatch) => {
		console.log(1);
		const res = await axios.get(`/allproducts/${category}`);
		if (res.status === 200) {
			console.log(2);
			dispatch({
				type: productConstants.GET_PRODUCTS_BY_SLUG,
				payload: res.data,
			});
		} else {
			// dispatch({
			// })
		}
	};
};

export const getProductPage = (payload) => {
	return async (dispatch) => {
		try {
			const { cid, type } = payload.params;
			const res = await axios.get(`/page/${cid}/${type}`);

			dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });

			if (res.status === 200) {
				const { page } = res.data;
				dispatch({
					type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
					payload: { page },
				});
			} else {
				const { error } = res.data;
				dispatch({
					type: productConstants.GET_PRODUCT_PAGE_FAILURE,
					payload: { error },
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getProductDetailsById = (payload) => {
	return async (dispatch) => {
		dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
		let res;
		try {
			const { productId } = payload.params;
			res = await axios.get(`/product/${productId}`);
			dispatch({
				type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
				payload: { productDetails: res.data.product },
			});
		} catch (error) {
			dispatch({
				type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
				payload: { error: res.data.error },
			});
		}
	};
};

export const talktoChatGPT = (payload) => {
	console.log(payload);
	return async (dispatch) => {
		dispatch({ type: productConstants.TALK_TO_BOT_REQUEST });
		let res;
		try {
			const { query } = payload;
			//console.log(query);
			res = await axios.post(`/talktoAIChatBox/${payload}`);
			console.log(res);
			dispatch({
				type: productConstants.TALK_TO_BOT_SUCCESS,
				payload: { productDetails: res },
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: productConstants.TALK_TO_BOT_FAILURE,
				payload: { error: res },
			});
		}
	};
};
