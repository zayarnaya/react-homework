export const selectCartModule = (state: any) => state.cart;

export const selectProductAmount = (state: any, id: string) =>
  selectCartModule(state)[id] || 0;



export const selectTotal = (state: any) => state.total.total;

// export const selectProductAmount = (state: any, id: string) =>
//   selectCartModule(state)[id] || 0;


export const selectCartItemsModule = (state: any) => state.cartItems;

export const selectCartItem = (state: any, id: string) =>
selectCartItemsModule(state)[id];
