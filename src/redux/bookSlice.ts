import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BookState } from "../types";

type initialStateType = {
  bookList: BookState[];
};
const bookList: BookState[] =
  JSON.parse(localStorage.getItem("userData") as string) ?? [];

const initialState: initialStateType = {
  bookList,
};

export const bookSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addNewBook: (state, action: PayloadAction<BookState>) => {
      state.bookList?.push(action.payload);
    },
    updateBook: (state, action: PayloadAction<BookState>) => {
      const {
        payload: { title, id, author },
      } = action;

      state.bookList = state.bookList.map((book) =>
        book.id === id ? { ...book, author, title } : book
      );
      localStorage.setItem("userData", JSON.stringify(state.bookList));
    },
    deleteBook: (state, action: PayloadAction<{ id: string }>) => {
      const newArr = state.bookList.filter(
        (book) => book.id !== action.payload
      );
      localStorage.setItem("userData", JSON.stringify(newArr));
      state.bookList = newArr;
    },
  },
});

export const { addNewBook, updateBook, deleteBook } = bookSlice.actions;

export const selectBookList = (state: RootState) => state.book.bookList;
export default bookSlice.reducer;
