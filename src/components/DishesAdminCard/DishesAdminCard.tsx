import React from "react";
import {Dish} from "../../type";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import {deleteDish} from "../../store/orderingAppThunks";

interface Props {
  dish: Dish,
}

const DishesAdminCard: React.FC<Props> = ({dish}) => {
  const dispatch = useAppDispatch();

  return (
    <div className={"alert alert-light d-flex justify-content-between"}>
      <div className={"d-flex align-items-center gap-5"}>
        <img alt={"#"} src={dish.image} className={"rounded"} style={{width: 100, height: 100}}/>
        <h6>{dish.title}</h6>
      </div>
      <div className={"d-flex align-items-center gap-5"}>
        <div>
          <strong>{dish.price} KGS</strong>
        </div>
        <div className={"d-flex gap-2"}>
          <Link to={`/admin/new-dish/${dish.id}`} className={"btn btn-primary"}>Edit</Link>
          <button type={"button"} onClick={() => dispatch(deleteDish(dish.id))} className={"btn btn-danger"}>Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishesAdminCard;