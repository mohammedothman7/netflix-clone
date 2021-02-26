import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    reset: (state) => {
      state.loading = false;
    },
  },
});

export const { setLoading, reset } = loadingSlice.actions;

export const selectLoading = (state) => state.loading.loading;

export default loadingSlice.reducer;
