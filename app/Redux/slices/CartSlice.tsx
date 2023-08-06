"use client";
import { CartProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

let items: CartProps[] = [];
if (typeof window !== 'undefined') {
    const storageItems = localStorage.getItem("cart")
    items = storageItems !== null ? JSON.parse(storageItems) : [];
}

const setCart = (items: CartProps[]) => {
    localStorage.setItem("cart", JSON.stringify(items))
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: items,
        totalPrice: 0
    },
    reducers: {
        computeTotalPrice(state) {
            let { totalQuantity, totalPrice } = state.cart.reduce((cartTotal, cartItem) => {
                const { price, quantity } = cartItem;
                const itemTotal = price * quantity;
                cartTotal.totalPrice += itemTotal;
                cartTotal.totalQuantity += quantity;
                return cartTotal;
            }, {
                totalPrice: 0,
                totalQuantity: 0
            }
            );
            state.totalPrice = parseInt(totalPrice.toFixed(2));
        },

        addItem(state, action) {
            const index = state.cart.findIndex((ele) => {
                return ele.name === action.payload.name
            })
            if (index !== -1) {
                state.cart[index].quantity += 1;
            }
            else {
                state.cart.push(action.payload)
            }
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter((ele) => {
                return ele.name !== action.payload.name;
            })
        },
        increaseQuantity(state, action) {
            const index = state.cart.findIndex((ele) => {
                return ele.name === action.payload
            })
            if (index !== -1) {
                state.cart[index].quantity += 1;
            }
        },
        decreaseQuantity(state, action) {
            const index = state.cart.findIndex((ele) => {
                return ele.name === action.payload
            })
            if (index !== -1) {
                state.cart[index].quantity -= 1;
                if (state.cart[index].quantity === 0) {
                    state.cart = state.cart.filter((ele) => {
                        return ele.name !== action.payload
                    })
                }
            }
        },
        updateCart(state) {
            setCart(state.cart)
        }
    }
});

export const { addItem, deleteItem, increaseQuantity, decreaseQuantity, updateCart, computeTotalPrice } = cartSlice.actions;
export default cartSlice.reducer;