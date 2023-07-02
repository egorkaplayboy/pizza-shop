import React from "react";

import Arrow from "../assets/img/sort.svg";
import { useDispatch, useSelector } from "react-redux";
import { setSort, sortPropertyEnum } from "../Redux/slices/filterSlice";
import { RootState } from "../Redux/store";

type SortItem = {
  name: string;
  sortProperty: sortPropertyEnum;
};

export const sortList: SortItem[] = [
  { name: "популярности ↓", sortProperty: sortPropertyEnum.RATING_DESC },
  { name: "популярности ↑", sortProperty: sortPropertyEnum.RATING_ASC },
  { name: "цене ↓", sortProperty: sortPropertyEnum.PRICE_DESC },
  { name: "цене ↑", sortProperty: sortPropertyEnum.PRICE_ASC },
  { name: "алфавиту ↓", sortProperty: sortPropertyEnum.TITLE_DESC },
  { name: "алфавиту ↑", sortProperty: sortPropertyEnum.TITLE_ASC },
];

const SortPopup: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.filter.sort);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState<boolean>(false);

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!sortRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort_label">
        <img src={Arrow} alt="sort" />
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort_popup">
          <ul>
            {sortList.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(obj)}
                className={
                  sort.sortProperty === obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
})

export default SortPopup;
