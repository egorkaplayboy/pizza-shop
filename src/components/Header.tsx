import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Logo from "../assets/img/logo.png";
import Palka from "../assets/img/header_palka.png";
import CartBtn from "../assets/img/cart-btn.png";
import { RootState } from "../Redux/store";

const Header = () => {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const location = useLocation();

  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

  return (
    <header className="header">
      <div className="header_left">
        <Link to="/">
          <img height={38} src={Logo} alt="logo" />
        </Link>
        <div className="header_left_text">
          <h1>Pizza</h1>
          <p>самая вкусная пицца во вселенной</p>
        </div>
      </div>
      {location.pathname !== "/cart" && (
        <div className="header_right">
          <Link className="link" to="/cart">
            <button>
              <b>{totalPrice} ₽</b>
              <img src={Palka} alt="|" />
              <img src={CartBtn} alt="cart" />
              {totalCount}
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
