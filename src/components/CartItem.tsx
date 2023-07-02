import React from "react";

import { useDispatch } from "react-redux";
import { Cart, addItem, minusItem, removeItem } from "../Redux/slices/cartSlice";

type CartItemsProps = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
};

const CartItemsBlock: React.FC<CartItemsProps> = ({
  id,
  title,
  type,
  size,
  price,
  count,
  imageUrl,
}) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      } as Cart)
    );
  };
  const onClickMinus = () => {
    if (count > 1) {
      dispatch(minusItem(id));
    } else {
      dispatch(removeItem(id));
    }
  };
  const onClickRemove = () => {
    dispatch(removeItem(id));
  };

  return (
    <div className="cart_item">
      <img height={80} src={imageUrl} alt="" />
      <div className="cart_item_desc">
        <h3>{title}</h3>
        <p>
          {type} тесто, {size} см.
        </p>
      </div>
      <div className="cart_item_count">
        <button onClick={onClickMinus} className="count_btn">
          -
        </button>
        <b>{count}</b>
        <button onClick={onClickPlus} className="count_btn">
          +
        </button>
      </div>
      <span>{price * count} ₽</span>
      <button onClick={onClickRemove} className="remove_btn">
        +
      </button>
    </div>
  );
};

export default CartItemsBlock;
