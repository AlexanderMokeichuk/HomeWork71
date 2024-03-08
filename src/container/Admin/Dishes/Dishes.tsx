import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchDishes} from "../../../store/orderingAppThunks";
import {selectOrderingDishes, selectOrderingLauding} from "../../../store/orderingAppSlice";
import DishesAdminCard from "../../../components/DishesAdminCard/DishesAdminCard";
import Spinner from "../../../components/Spinner/Spinner";

const Dishes: React.FC = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectOrderingDishes);
  const lauding = useAppSelector(selectOrderingLauding);


  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <div className={"d-flex flex-column mt-5"}>
      {(lauding)
        ? <Spinner />
        : <>
          <Link to={"/admin/new-dish"} className={"btn btn-primary ms-auto"}>Add new dish</Link>
          <div>
            <h3>Dishes</h3>
            <div className={"overflow-y-auto"} style={{height: 700}}>
              {dishes.map((dish) => {
                return <DishesAdminCard key={dish.id} dish={dish}/>;
              })}
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default Dishes;