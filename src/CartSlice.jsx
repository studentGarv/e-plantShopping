import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;
      const existingItem = state.items.find(item => item.plant.id === plant.id);
      if (!existingItem) {
        state.items.push({ plant, quantity: 1 });
      } else {
        existingItem.quantity += 1;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.plant.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.plant.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        if (itemToUpdate.quantity <= 0) {
           state.items = state.items.filter(item => item.plant.id !== id);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
