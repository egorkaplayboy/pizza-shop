import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "../assets/img/cart.png";
import Trash from "../assets/img/trash.png";
import CartItem from "../components/CartItem";
import { clearItems } from "../Redux/slices/cartSlice";
import CartEmpty from "../components/CartEmpty";
import { RootState } from "../Redux/store";

const NotFound: React.FC = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector((state: RootState) => state.cart);

  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

  const onClickClear = () => {
    if (window.confirm("Ты действительно хочешь удалить все товары?")) {
      dispatch(clearItems());
    }
  };
  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="cart">
      <div className="cart_top">
        <div className="cart_title">
          <img height={29} src={Cart} alt="trash" />
          <h2>Корзина</h2>
        </div>
        <div onClick={onClickClear} className="cart_trash">
          <img height={20} src={Trash} alt="trash" />
          <p>Очистить корзину</p>
        </div>
      </div>
      <div className="cart_items">
        {items.map((item: any) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <div className="cart_bottom">
        <div className="cart_bottom_left">
          <p>
            Всего пицц: <b>{totalCount} шт.</b>
          </p>
          <button>Вернуться назад</button>
        </div>
        <div className="cart_bottom_right">
          <p>
            Сумма заказа: <span>{totalPrice} ₽</span>
          </p>
          <button>Оплатить сейчас</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
