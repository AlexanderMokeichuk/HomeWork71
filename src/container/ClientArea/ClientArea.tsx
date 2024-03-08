import React, {useEffect, useState} from "react";
import image from "../../assets/phone.png";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchDishes} from "../../store/orderingAppThunks";
import {selectOrderingCartDishes, selectOrderingDishes} from "../../store/orderingAppSlice";
import DishesClientCad from "../../components/DishesClientCad/DishesClientCad";
import Modal from "../../components/Modal/Modal";
import "./ClientArea.css";

const backStyle = {
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

const ClientArea: React.FC = () => {
  const dishes = useAppSelector(selectOrderingDishes);
  const dispatch = useAppDispatch();
  const cartDishes = useAppSelector(selectOrderingCartDishes);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const total = cartDishes.reduce((sum, cartDish) => {
    return sum + parseInt(cartDish.dish.price) * cartDish.amount;
  }, 0);

  const cancel = () => setShowModal(false);

  return (
    <div className={"d-flex justify-content-center align-items-center mx-auto mt-5"}
         style={{...backStyle, width: 400, height: 700}}>
      <div className={"d-flex py-2 flex-column position-relative"} style={{width: 323, height: 539}}>
        <Modal show={showModal} modalCancel={cancel} cartDishes={cartDishes}/>
        <div className={"pt-2 px-2 border-bottom"}>
          <h6>Turtle Pizza</h6>
        </div>
        <div className={"content h-100 p-1"}>
          {dishes.map((dish) => {
            return <DishesClientCad key={dish.id} dish={dish} />;
          })}
        </div>
        <div className={"d-flex align-items-center mt-auto border p-2"}>
          <span>Order total: {total} KGS</span>
          <button type={"button"} onClick={() => setShowModal(true)} className={"rounded d-flex ms-auto"}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default ClientArea;