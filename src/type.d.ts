export interface ApiDish {
  title: string,
  price: string,
  image: string,
}

export interface ApiDishes {
  [id: string]: ApiDish,
}

export interface Dish extends ApiDish {
  id: string,
}

export interface ApiOrder {
  dish: Dish,
  amount: number,
}

export interface ApiOrders {
  [id: string]: {
    [id: string]: number,
  }
}

export interface Orders  extends ApiDish{
  amount: number,
}
export interface Order {
  id: string,
  orders: Orders[]
}
