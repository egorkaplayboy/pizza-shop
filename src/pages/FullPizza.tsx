import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title:string;
    price:number;
  }>();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://6457f09a1a4c152cf98df7cd.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка!");
      }
    }

    fetchPizza();
  }, [id]);

  if (!pizza) {
    return <>Загрузка...</>
  }

  return (
    <div className="fullpizza_item">
      <img height={200} src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h3>{pizza.price} ₽</h3>
    </div>
  );
};

export default FullPizza;
