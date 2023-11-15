import { createSlice } from "@reduxjs/toolkit";

export const currentGenreOrCategory = createSlice({
  name: "genreOrCategory",
  initialState: {
    genreOrCategoryName: "",
    page: 1,
    searchQuery: "",
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { selectGenreOrCategory } = currentGenreOrCategory.actions;

export default currentGenreOrCategory.reducer;
