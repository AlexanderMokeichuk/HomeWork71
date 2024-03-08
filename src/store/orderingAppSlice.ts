import {ApiDish, ApiOrder, Dish, Order} from "../type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {addDish, fetchDish, fetchDishes, fetchOrders} from "./orderingAppThunks";

interface OrderingAppSlice {
  dishes: Dish[],
  dish: ApiDish | null,
  cartDishes: ApiOrder[],
  orders: Order[],
  lauding: boolean,
  btnLauding: boolean,
}

const initialState: OrderingAppSlice = {
  dishes: [],
  dish: null,
  cartDishes: [],
  orders: [],
  lauding: false,
  btnLauding: false,
};

const orderingAppSlice = createSlice({
  name: "orderingApp",
  initialState: initialState,
  reducers: {
    addDishToCart: (state, {payload: dish}: PayloadAction<Dish>) => {
      const index = state.cartDishes.findIndex(cartDish => cartDish.dish.id === dish.id);
      if (index !== -1) {
        state.cartDishes[index].amount++;
      } else {
        state.cartDishes.push({
          dish,
          amount: 1,
        });
      }
    },
    deleteDish: (state, {payload: id}: PayloadAction<string>) => {
      const index = state.cartDishes.findIndex(cartDish => cartDish.dish.id === id);
      const dish = state.cartDishes[index];
      if (dish.amount !== 1) {
        state.cartDishes[index].amount--;
      } else {
        state.cartDishes.splice(index, 1);
      }
    },
    updateCartDishes: (state) => {
      state.cartDishes = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDishes.pending, (state) => {
      state.dish = null;
      state.lauding = true;
    });
    builder.addCase(fetchDishes.fulfilled, (state, {payload: dishes}: PayloadAction<Dish[]>) => {
      state.dishes = dishes;
      state.lauding = false;
    });
    builder.addCase(fetchDishes.rejected, (state) => {
      state.lauding = false;
    });


    builder.addCase(addDish.pending, (state) => {
      state.btnLauding = true;
    });
    builder.addCase(addDish.fulfilled, (state) => {
      state.btnLauding = false;
    });
    builder.addCase(addDish.rejected, (state) => {
      state.btnLauding = false;
    });


    builder.addCase(fetchDish.pending, (state) => {
      state.lauding = true;
    });
    builder.addCase(fetchDish.fulfilled, (state, {payload: dish}: PayloadAction<Dish | null>) => {
      state.dish = dish;
      state.lauding = false;
    });
    builder.addCase(fetchDish.rejected, (state) => {
      state.lauding = false;
    });


    builder.addCase(fetchOrders.pending, (state) => {
      state.lauding = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, {payload: order}: PayloadAction<Order[]>) => {
      state.lauding = false;
      state.orders = order;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.lauding = false;
    });
  },
});

export const orderingAppReducer = orderingAppSlice.reducer;
export const {
  addDishToCart,
  deleteDish,
  updateCartDishes
} = orderingAppSlice.actions;
export const selectOrderingDishes = (state: RootState) => state.orderingApp.dishes;
export const selectOrderingDish = (state: RootState) => state.orderingApp.dish;
export const selectOrderingCartDishes = (state: RootState) => state.orderingApp.cartDishes;
export const selectOrderingOrders = (state: RootState) => state.orderingApp.orders;
export const selectOrderingLauding = (state: RootState) => state.orderingApp.lauding;
export const selectOrderingBtnLauding = (state: RootState) => state.orderingApp.btnLauding;