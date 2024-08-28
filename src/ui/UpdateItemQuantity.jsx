import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import {
  decreaseItemQuantity,
  getItemQuantity,
  increaseItemQuantity,
} from "../features/cart/cartSlice";

function UpdateItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();
  const itemQuantity = useSelector(getItemQuantity(pizzaId));

  function handleIncreaseItem() {
    dispatch(increaseItemQuantity(pizzaId));
  }
  function handleDecreaseItem() {
    dispatch(decreaseItemQuantity(pizzaId));
  }

  return (
    <div className="flex items-center justify-center gap-1.5">
      <Button type="round" onClick={handleIncreaseItem}>
        +
      </Button>
      <p className="text-sm font-semibold">{itemQuantity}</p>
      <Button type="round" onClick={handleDecreaseItem}>
        -
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
