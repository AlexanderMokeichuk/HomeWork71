import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchOrders} from "../../../store/orderingAppThunks";
import {selectOrderingOrders} from "../../../store/orderingAppSlice";

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrderingOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div>
      <h3>Orders</h3>
      <div>
        {orders.map((order) => {
          return (
            <div key={order.id} className={"alert alert-primary"}>
              {order.orders.map((item, index) => {
                  return (
                    <div key={`${item.title}${index}`}  className={"d-flex"}>
                      <div className={"d-flex gap-3"}>
                        <div>x{item.amount}</div>
                        <div>{item.title}</div>
                      </div>
                    </div>
                  );
              })}
              <div>
                <div>Delivery</div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;