import React from "react";
import {Dish} from "../../type";
import "./DishesClientCard.css";
import {useAppDispatch} from "../../app/hooks";
import {addDishToCart} from "../../store/orderingAppSlice";


interface Props {
  dish: Dish,
}

const DishesClientCad: React.FC<Props> = ({dish}) => {
  const dispatch = useAppDispatch();
  return (
    <div onClick={() => dispatch(addDishToCart(dish))} className={"dishesCard alert alert-light"}>
      <div className={"d-flex align-items-center justify-content-between"}>
        <img alt={"#"} src={dish.image} className={"rounded"} style={{width: 50, height: 50}}/>
        <h6>{dish.title}</h6>
        <strong>{dish.price} KGS</strong>
      </div>
    </div>
  );
};

export default DishesClientCad;