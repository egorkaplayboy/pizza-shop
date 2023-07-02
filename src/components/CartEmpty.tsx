import React from "react";

import Empty from "../assets/img/emptyCart.png";
import { Link } from "react-router-dom";

const CartEmpty: React.FC = () => {
  return (
    <div className="cart_empty">
      <h2>Корзина пустая 😕</h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать
        пиццу, перейди на главную страницу.
      </p>
      <img src={Empty} alt="empty" />
      <Link to="/">
        <button>Вернуться назад</button>
      </Link>
    </div>
  );
};

export default CartEmpty;
