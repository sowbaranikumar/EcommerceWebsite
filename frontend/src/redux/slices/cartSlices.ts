import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/products";

interface CartItem extends Product {
    quantity: number;
}
interface CartState {
    items: CartItem[];
}
const initialState: CartState = {
    items: [],
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existing = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...action.payload,price: Number(action.payload.price), quantity: 1 });
            }
        },
        increaseQty: (state, action: PayloadAction<number>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) item.quantity += 1;
        },

        decreaseQty: (state, action: PayloadAction<number>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        removeItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },

        clearCart(state) {
            state.items = [];
        },
    }
});
export const {
    addToCart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart
} = cartSlice.actions;
export default cartSlice.reducer;
