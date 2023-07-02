import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { addItem } from "../../Redux/slices/cartSlice";
import { RootState } from "../../Redux/store";
import { Cart } from "../../Redux/slices/cartSlice";

type ItemsProps = {
  title: string;
  price: number;
  imageUrl: string;
  id: string;
  sizes: number[];
  types: number[];
  rating: number;
};

const Items: React.FC<ItemsProps> = ({
  title,
  price,
  imageUrl,
  sizes,
  types,
  id,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
  state.cart.items.find((obj) => obj.id === id)
);

const addedCount = cartItem ? cartItem.count : 0;

  const [activeSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);

  const typeNames = ["тонкое", "традиционное"];

  const onClickAdd = () => {
    const item: Cart = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="content_wrapper">
      <div className="content_item">
        <Link to={`/pizza/${id}`}>
          <img src={imageUrl} alt="pizza" />
        </Link>
        <h3>{title}</h3>
        <ul>
          {types.map((type, index) => (
            <li
              key={index}
              onClick={() => setActiveType(index)}
              className={activeType === index ? "active" : ""}
            >
              {typeNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={index}
              onClick={() => setActiveSize(index)}
              className={activeSize === index ? "active" : ""}
            >
              {size} см.
            </li>
          ))}
        </ul>
        <div className="item_bottom">
          <h3>от {price} ₽</h3>
          <button onClick={onClickAdd}>
            Добавить
            {addedCount > 0 && (
              <div className="circle">
                <span>{addedCount}</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Items;
