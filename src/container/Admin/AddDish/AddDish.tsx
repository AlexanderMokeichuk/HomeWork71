import React, {FormEvent, useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectOrderingBtnLauding, selectOrderingDish, selectOrderingLauding} from "../../../store/orderingAppSlice";
import {addDish, editDish, fetchDish} from "../../../store/orderingAppThunks";
import {ApiDish} from "../../../type";
import Spinner from "../../../components/Spinner/Spinner";

const defaultState: ApiDish = {
  title: "",
  price: "",
  image: "",
};

const AddDish: React.FC = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dish = useAppSelector(selectOrderingDish);
  const lauding = useAppSelector(selectOrderingLauding);
  const btnLauding = useAppSelector(selectOrderingBtnLauding);
  const [dishForm, setDishForm] = useState<ApiDish>(defaultState);


  const fetchOneDish = useCallback(async () => {
    if (id) {
      await dispatch(fetchDish(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    void fetchOneDish();
  }, [fetchOneDish]);

  useEffect(() => {
    if (dish) {
      setDishForm(dish);
    }
  }, [dish]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== " ") {
      setDishForm({
        ...dishForm,
        [e.target.name]: e.target.value
      });
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (id) {
      await dispatch(editDish({...dishForm, id}));
    } else {
      await dispatch(addDish(dishForm));
    }
    setDishForm(defaultState);
    navigate("/admin/dishes");
  };

  const urlImage = (dishForm.image === "") ? "https://brilliant24.ru/files/cat/bg_template_01.png" : `${dishForm.image}`;


  return (
    (lauding)
      ? <Spinner/>
      : <>
        <form onSubmit={onSubmit} className={"mt-5 form-control d-flex flex-column gap-3 p-3"}>
          <div>
            <label htmlFor={"title"}>Title</label>
            <input
              type={"text"}
              name={"title"}
              className={"form-control"}
              required
              value={dishForm.title}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor={"price"}>Price</label>
            <input
              type={"number"}
              name={"price"}
              className={"form-control"}
              required

              value={dishForm.price}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor={"image"}>Image</label>
            <input
              type={"url"}
              name={"image"}
              className={"form-control"}
              required

              value={dishForm.image}
              onChange={onChange}
            />
          </div>
          <div className={"form-control d-flex gap-5 p-2"} style={{width: 370}}>
            <h6>Dish preview</h6>
            <img
              src={urlImage} alt={"#"}
              className={"border rounded"}
              style={{height: 200, width: 200}}/>
          </div>
          <button type={"submit"} className={"btn btn-primary ms-auto"} disabled={btnLauding}>
            {(id)
              ? "Edit"
              : "Add"
            }
          </button>
        </form>
      </>
  )
    ;
};

export default AddDish;