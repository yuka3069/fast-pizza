import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="px-4 pt-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="mt-7 text-lg font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
