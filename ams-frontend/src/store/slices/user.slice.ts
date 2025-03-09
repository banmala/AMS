import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IUser } from '@/@types/auth.type';
import { getUserData, registerUserApi } from '@/api/auth.api';
import { deleteUserById, fetchUserDetailById, getAllUserData, updateUserApi } from '@/api/user.api';
import { displaySnackbar } from './snackbar.slice';

interface userState {
  data: {
    items: IUser[];
  };
  loading: boolean;
  error: string | undefined;
  detail?: IUser;
}
const initialState: userState = {
  data: {
    items: [],
  },
  loading: false,
  error: undefined,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUsers.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data.items = action.payload.users;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, state => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.detail=action.payload.user
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.detail=undefined
      });
  },
});

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (_,{dispatch}): Promise<any> => {
    try {
      const allUsers =  await getAllUserData();
      dispatch(displaySnackbar(allUsers.message))
      return allUsers.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      dispatch(displaySnackbar("Something went wrong!"));
      return ;
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({data,userId}:{data: IUser,userId:number}, { rejectWithValue,dispatch }) => {
    try {
      const updateResult =  await updateUserApi(data, userId);
      dispatch(displaySnackbar(updateResult.message))
      return updateResult;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      dispatch(displaySnackbar("Something went wrong!"))
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (id:number, { rejectWithValue,dispatch }) => {
      try {
        const deleteResult = await deleteUserById(id);
        dispatch(displaySnackbar(deleteResult.message));
        return deleteResult;
      } catch (err: any) {
        if (!err.response) {
          throw err;
        }
        dispatch(displaySnackbar("Something went wrong!!"))
        return rejectWithValue(err.response.data.errors);
      }
    }
  );

  export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (id:number,{dispatch}) => {
      const fetchData =  await fetchUserDetailById(id);
      if (fetchData?.success == true) {
        dispatch(displaySnackbar(fetchData.message));
        return fetchData.data;
      } else {
        dispatch(displaySnackbar(fetchData.message));
        throw new Error('Error fetching user data');
      }
    }
  );
  