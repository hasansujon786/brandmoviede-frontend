import CartItem from "../../shared/CartItem/CartItem";

export default function CartList() {
  return (
    <div>
      <h5 className="text-heading-200 font-heading text-3xl font-semibold">
        Shopping Cart
      </h5>
      <p className="mt-3 text-xl">2 items in your cart</p>
      <div className="mt-6 space-y-4">
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
    </div>
  );
}
