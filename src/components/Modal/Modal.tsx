import React from "react";
import "./Modal.css";
import {ApiOrder} from "../../type";
import {useAppDispatch} from "../../app/hooks";
import {deleteDish, updateCartDishes} from "../../store/orderingAppSlice";
import {addOrder} from "../../store/orderingAppThunks";

interface Props {
  show: boolean,
  cartDishes: ApiOrder[],
  modalCancel: () => void,
}

const Modal: React.FC<Props> = ({show, cartDishes, modalCancel}) => {
  const dispatch = useAppDispatch();

  let delivery = 0;
  if (cartDishes.length) delivery = 150;


  const total = cartDishes.reduce((sum, cartDish) => {
    return sum + parseInt(cartDish.dish.price) * cartDish.amount;
  }, delivery);

  const makeAnOrder = async () => {
    dispatch(updateCartDishes());
    await dispatch(addOrder(cartDishes));
    modalCancel();
  };

  return (
    <div
      className={"position-absolute z-1 start-0 top-0 bg-white"}
      style={{display: show ? "block" : "none", width: "100%", height: "100%"}}
    >
      <div className={"h-100 d-flex flex-column"}>
        <div className={"px-4 py-3"}>
          <h5>Your order:</h5>
          <div className={"modalContent mb-3"} style={{maxHeight:300}}>
            {cartDishes.map((dish) => {
              return (
                <div key={dish.dish.id} className={"d-flex justify-content-between"}>
                  <div>{dish.dish.title}</div>
                  <div>x{dish.amount}</div>
                  <div>{dish.amount * parseInt(dish.dish.price)} KGS</div>
                  <button onClick={() => dispatch(deleteDish(dish.dish.id))}>x</button>
                </div>
              );
            })}
          </div>
          <div className={"d-flex justify-content-between"}>
            <div>Delivery</div>
            <div><strong>{delivery} KGS</strong></div>
          </div>
          <div className={"d-flex justify-content-between fw-bold"}>
            <div>Total</div>
            <div>{total} KGS</div>
          </div>
        </div>
        <div className={"d-flex flex-column mt-auto"}>
          <button onClick={modalCancel}>Cancel</button>
          <button onClick={makeAnOrder}>Order</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;