import React from "react";
import { useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { setCategoryId, setFilters } from "../Redux/slices/filterSlice";

import { SerachParams, fetchPizzas } from "../Redux/slices/pizzasSlice";

import Categories from "../components/Categories";
import Items from "../components/Items";
import Sort, { sortList } from "../components/Sort";
import Skeleton from "../components/Items/Skeleton";
import Search from "../components/Search";
import { RootState, useAppDispatch } from "../Redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryId, sort } = useSelector((state: RootState) => state.filter);
  const { items, status } = useSelector((state: RootState) => state.pizza);

  const [inputValue, setInputValue] = React.useState("");

  const onClickCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, [dispatch]);

  const sortBy =
    sort && sort.sortProperty ? sort.sortProperty.replace("-", "") : "";
  const order =
    sort && sort.sortProperty
      ? sort.sortProperty.includes("-")
        ? "asc"
        : "desc"
      : "desc";
  const category = categoryId > 0 ? `category=${categoryId}` : "";

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SerachParams;

      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          categoryId: Number.isNaN(categoryId) ? 0 : categoryId,
          sort: sort || sortList[0],
        })
      );
    }
  }, [dispatch, categoryId]);

  React.useEffect(() => {
    async function getPizzas() {
      try {
        dispatch(
          fetchPizzas({
            sortBy,
            order,
            category,
          })
        );
      } catch (error) {
        console.log("ERROR", error);
      }
    }

    getPizzas();
  }, [
    categoryId,
    sort.sortProperty,
    inputValue,
    category,
    sortBy,
    order,
    dispatch,
  ]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sort?.sortProperty,
      categoryId,
    });

    navigate(`?${queryString}`);
  }, [categoryId, sort.sortProperty, inputValue, navigate]);

  const pizzas = items
    .filter((obj: any) => {
      if (
        obj.title.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
      ) {
        return true;
      }
      return false;
    })
    .map((obj: any) => <Items key={obj.id} {...obj} />);

  const skeleton = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="content_top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h3 className="title_items">Все пиццы</h3>
      <div className="search">
        <Search setInputValue={setInputValue} />
      </div>
      {status === "error" ? (
        <div className="content_error">
          <h2>Ой, что-то пошло не так 😕</h2>
          <p>Не удалось получить пиццы. Попробуйте зайти на сайт позже.</p>
        </div>
      ) : (
        <div className="content_items">
          {status === "loading" ? skeleton : pizzas}
        </div>
      )}
    </>
  );
};

export default Home;
