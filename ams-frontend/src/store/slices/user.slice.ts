import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IUser } from '@/@types/auth.type';
import { getUserData, registerUserApi } from '@/api/auth.api';
import { deleteUserById, fetchUserDetailById, getAllUserData, updateUserApi } from '@/api/user.api';

interface userState {
  data: {
    items: IUser[];
    search?: string;
    desc?: boolean;
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
  reducers: {
    setQuery: (state, action) => {
      state.data.search = action.payload;
    },
    setOrder: (state, action) => {
      state.data.desc = action.payload === 'desc' ? true : false;
    },
  },
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
  async (): Promise<any> => {
    try {
      const allUsers =  await getAllUserData();
      return allUsers.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return ;
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({data,userId}:{data: IUser,userId:number}, { rejectWithValue }) => {
    try {
      return await updateUserApi(data, userId);
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (id:number, { rejectWithValue }) => {
      try {
        return await deleteUserById(id);
      } catch (err: any) {
        if (!err.response) {
          throw err;
        }
        return rejectWithValue(err.response.data.errors);
      }
    }
  );

  export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (id:number) => {
      const fetchData =  await fetchUserDetailById(id);
      if (fetchData?.success == true) {
        return fetchData.data;
      } else {
        throw new Error('Error fetching user data');
      }
    }
  );
  