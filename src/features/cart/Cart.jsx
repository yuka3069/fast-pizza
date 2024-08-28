import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "../cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  // const cart = fakeCart;

  const cart = useSelector(getCart);
  const userName = useSelector((store) => store.user.userName);
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }
  if (!cart?.length) return <EmptyCart />;

  return (
    <div className="px-4 pt-3">
      <LinkButton to="/menu"> &larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {userName}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.key}></CartItem>
        ))}
      </ul>

      <div className="mt-6 space-x-6">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
