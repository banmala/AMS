import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface snackberState {
  showSnackbar: boolean;
  message?:string;
}
const initialState: snackberState = {
  showSnackbar: false,
  message:""
};

export const SnackbarSlice = createSlice({
  name: 'snackbar',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(displaySnackbar.fulfilled, (state, action) => {
        state.showSnackbar = true;
        state.message = action?.payload?.message;
      })
      .addCase(removeSnackbar.fulfilled, (state) => {
        state.showSnackbar = false;
      })
  },
});

export const displaySnackbar = createAsyncThunk(
  'snackbar/displaySnackbar',
  async (message:string) => {
    try {
      return {message};
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return ;
    }
  }
);

export const removeSnackbar = createAsyncThunk(
  'snackbar/removeSnackbar',
  async (): Promise<any> => {
    try {
      return true
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return ;
    }
  }
);