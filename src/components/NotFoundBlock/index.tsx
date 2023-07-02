import React from "react";

import s from "./NotFoundBlock.module.css";

const index: React.FC = () => {
  return (
    <div className={s.root}>
      <h1>
        <span>😔</span> <br /> Ничего не найдено
      </h1>
      <p>К сожалению данной страницы не существует</p>
    </div>
  );
};

export default index;
