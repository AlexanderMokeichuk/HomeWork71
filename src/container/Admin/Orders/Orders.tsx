import React, {useEffect} from "react";
import {useAppDispatch} from "../../../app/hooks";
import {fetchOrders} from "../../../store/orderingAppThunks";

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div>
      <h3>Orders</h3>
    </div>
  );
};

export default Orders;