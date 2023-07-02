import React from "react";
import debounce from "lodash.debounce";

import style from "./Search.module.css";

type SearchProps = {
  setInputValue: any,
}

const Search: React.FC<SearchProps> = ({ setInputValue }) => {
  const [value, setValue] = React.useState("");

  const updateSerachValue = React.useCallback(
    debounce((str) => {
      setInputValue(str);
    }, 300),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSerachValue(e.target.value);
  };

  return (
    <input
      value={value}
      onChange={onChangeInput}
      className={style.root}
      type="text"
      placeholder="Поиск..."
    />
  );
};

export default Search;
