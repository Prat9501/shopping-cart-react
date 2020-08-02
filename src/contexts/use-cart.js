import React, { createContext, useContext, useReducer, useRef } from 'react';
import products from '../products';


const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const initialState = { cart: [] }

function reducer(state, {type, payload}){
    switch(type){
        case 'ADD':
            return{
                ...state,
                cart: [
                    ...state.cart,
                    products.find((product) => product.sku === payload)
                ]
            };
        case 'REMOVE':
            const indexInCart = state.cart.findIndex((p) => p.sku === payload)
            const newCart = [...state.cart];
            newCart.splice(indexInCart, 1);
            return {...state, cart: newCart};

        case 'EMPTY':

        default:
            return state;
    }
}


export function CartProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    function addItem(sku){
        dispatch({type: 'ADD', payload: sku});
    }

    function removeItem(sku){
        dispatch({type: 'REMOVE', payload: sku});
    }

    function countItemsInCart(sku){
        const itemsInCart = state.cart.filter((product) => product.sku === sku) ?? [];
        return itemsInCart.length;
    }

    return(
        <CartContext.Provider 
            value={{
                addItem,
                removeItem,
                cart: state.cart,
                countItemsInCart,
                totalPrice: ''
            }}>
            {children}
        </CartContext.Provider>
    )
}