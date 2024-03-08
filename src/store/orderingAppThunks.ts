import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiDish, ApiDishes, ApiOrder, ApiOrders, Dish, Order} from "../type";
import axiosApi from "../axiosApi";

export const addDish  = createAsyncThunk<void, ApiDish>(
  "orderingApp/addDish",
  async (dish) => {
    await axiosApi.post("/dishes.json", dish);
  },
);

export const deleteDish = createAsyncThunk<void, string>(
  "orderingApp/deleteDish",
  async (id, thunkAPI) => {
    if (confirm("Are you sure?")) {
      await axiosApi.delete(`/dishes/${id}.json`);
      await thunkAPI.dispatch(fetchDishes());
    }
  },
);

export const editDish = createAsyncThunk<void, Dish>(
  "orderingApp/editDish",
  async (dish) => {
    const newDish: ApiDish = {
      title: dish.title,
      price: dish.price,
      image: dish.image,
    };
    await axiosApi.put(`/dishes/${dish.id}.json`, newDish);
  },
);

export const fetchDish = createAsyncThunk<Dish | null, string>(
  "orderingApp/fetchDish",
  async (id) => {
    const {data: response} = await axiosApi.get<ApiDish | null>(`/dishes/${id}.json`);
    if (response == null) {
      return null;
    }

    return {
      ...response,
      id
    };
  }
);

export const fetchDishes = createAsyncThunk<Dish[] | [], undefined>(
  "orderingApp/fetchDishes",
  async () => {
    const {data: response} = await axiosApi.get<ApiDishes  | null>("/dishes.json");
    if (response === null) {
      return [];
    }

    const dishes: Dish[] = Object.keys(response).map((id) => {
      return {
        ...response[id],
        id,
      };
    }).reverse();

    return dishes;
  }
);

export const addOrder = createAsyncThunk<void, ApiOrder[]>(
  "orderingApp/addOrder",
  async (order) => {
    const newOrder = order.map((item) => {
      return [[item.dish.id], item.amount];
    });
    const obj = Object.fromEntries(newOrder);
    await axiosApi.post("/orders.json", obj);
  },
);

export const fetchOrders = createAsyncThunk<Order[] | [], undefined>(
  "orderingApp/fetchOrders",
  async () => {
    const {data: orders} = await axiosApi.get<ApiOrders | null>("/orders.json");
    if (orders) {
      const newOrders: Order[] = Object.keys(orders).map((id) => {
        return {
          orders: orders[id],
          id,
        };
      });

      return newOrders;
    }

    return [];
  },
);
