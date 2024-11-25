import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadState(),
  },
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload;
      const existingProduct = state.items.find(
        item => item.id === productToAdd.id && item.code === productToAdd.code && item.price === productToAdd.price
      );

      if (existingProduct) {
        existingProduct.quantity += productToAdd.quantity;
      } else {
        state.items.push(productToAdd);
      }
      saveState(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id || item.code !== action.payload.code || item.price !== action.payload.price);
      saveState(state.items);
    },
    updateCartItemQuantity: (state, action) => {
      const { id, code, price, quantity } = action.payload;
      const product = state.items.find(item => item.id === id && item.code === code && item.price === price);
      if (product) {
        product.quantity = quantity;
      }
      saveState(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveState(state.items);
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
