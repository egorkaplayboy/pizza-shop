import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum sortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type Sort = {
  name: string;
  sortProperty: sortPropertyEnum;
};

export interface FilterSliceState {
  categoryId: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: {
    name: "популярности ↓",
    sortProperty: sortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: "Filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
