/** @format */

import { productConstants } from "../actions/constants";

const initialState = {
	products: [],
	productsByPrice: {
		under5k: [],
		under10k: [],
		under15k: [],
		under20k: [],
		under30k: [],
	},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
	// eslint-disable-next-line default-case
	switch (action.type) {
		case productConstants.GET_PRODUCTS_BY_SLUG:
			state = {
				...state,
				products: action.payload.products,
				productsByPrice: {
					...action.payload.productsByPrice,
				},
			};
			break;
	}
	return state;
};
