import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {completeOneOrder, fetchOrders} from "../../../store/orderingAppThunks";
import {selectOrderingOrders} from "../../../store/orderingAppSlice";
import {DELIVERY} from "../../../constants";
import {Order} from "../../../type";

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrderingOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const completeOrder = async (id: string) => {
    await dispatch(completeOneOrder(id));
    await dispatch(fetchOrders());
  };


  const counter = (order: Order) => {
    const total = order.orders.reduce((sum, order) => {
      return sum + order.amount * parseInt(order.price);
    }, DELIVERY);
    return total;
  };


  return (
    <div>
      <h3>Orders</h3>
      <div>
        {orders.map((order) => {
          return (
            <div key={order.id} className={"alert alert-primary d-flex"}>
              <div className={"w-75"}>
                {order.orders.map((item, index) => {
                  return (
                    <div key={`${item.title}${index}`}  className={"d-flex justify-content-between align-items-center"}>
                      <div className={"d-flex gap-3"}>
                        <div>x{item.amount}</div>
                        <div>{item.title}</div>
                      </div>
                      <div className={"fw-bold d-flex gap-2"}>
                        <div>{parseInt(item.price) * item.amount}</div>
                        <div>KGS</div>
                      </div>

                    </div>
                  );
                })}
                <div className={"fw-bold d-flex justify-content-between mt-3"}>
                  <div>Delivery</div>
                  <div>{DELIVERY} KGS</div>
                </div>
              </div>
              <div className={"ms-auto d-flex flex-column"}>
                <p>Total price:</p>
                <strong>{counter(order)} KGS</strong>
                <button type={"button"} className={"mt-auto"} onClick={() => completeOrder(order.id)}>Complete order</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;