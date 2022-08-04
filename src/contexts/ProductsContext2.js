import { createContext, useReducer } from "react";

const Context = createContext(null);

const initialState = [];

const ProductsReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_PRODUCT':
			return [
				...state, action.payload
			]
		case 'UPDATE_PRODUCT':
			return state;
		case 'DELETE_PRODUCT':
			return state;
		default:
			return state;

	}

}
const ProductsProvider = ({ children }) => {
	// const arr = [1, 2, 3, 4];
	const [state, dispatch] = useReducer(ProductsReducer, initialState);

	const addProduct = (product) => dispatch({ type: 'ADD_PRODUCT', payload: product });

	const reducer = (a, b) => a + b;

	console.log([1, 2, 3, 4, 5].reduce(reducer, 0));

	return <Context.Provider value={{ data: state, addProduct }}>
		{children}
	</Context.Provider>

};


export { Context, ProductsProvider }