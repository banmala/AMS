import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IUser } from '@/@types/auth.type';
import { getUserData } from '@/api/auth.api';
import { deleteUserById, fetchUserDetailById, getAllUserData } from '@/api/user.api';

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
      })
      // .addCase(createUser.pending, state => {
      //   state.loading = true;
      //   state.error = '';
      // })
      // .addCase(createUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.data.items.concat(action.payload.data);
      // })
      // .addCase(createUser.rejected, (state, action) => {
      //   state.loading = false;
      // })
      // .addCase(updateUser.pending, state => {
      //   state.loading = true;
      //   state.error = '';
      // })
      // .addCase(updateUser.fulfilled, state => {
      //   state.loading = false;
      // })
      // .addCase(updateUser.rejected, (state, action) => {
      //   state.loading = false;
      // })
      // .addCase(fetchUserDetail.pending, state => {
      //   state.loading = true;
      //   state.error = '';
      // })
      // .addCase(fetchUserDetail.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.detail = action.payload;
      // })
      // .addCase(fetchUserDetail.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      // });
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

// export const createUser = createAsyncThunk(
//   'user/createUser',
//   async (data: IUsers, { rejectWithValue }) => {
    // try {
    //   return await UserApi.create(data);
    // } catch (err: any) {
    //   if (!err.response) {
    //     throw err;
    //   }
    //   return rejectWithValue(err.response.data.errors);
    // }
//   }
// );

// export const updateUser = createAsyncThunk(
//   'user/updateUser',
//   async (data: IUsers, { rejectWithValue }) => {
//     try {
//       return await UserApi.update(data);
//     } catch (err: any) {
//       if (!err.response) {
//         throw err;
//       }
//       return rejectWithValue(err.response.data.errors);
//     }
//   }
// );

// export const fetchUserDetail = createAsyncThunk(
//   'user/fetchUserDetail',
//   async (itemId: string): Promise<IUsers> => {
//     return UserApi.fetchDetail(itemId);
//   }
// );

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
      console.log("FetchData: ", fetchData)
      if (fetchData?.success == true) {
        return fetchData.data;
      } else {
        throw new Error('Error fetching user data');
      }
    }
  );
  