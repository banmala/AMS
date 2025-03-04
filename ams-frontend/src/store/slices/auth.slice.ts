import {
  getLocalStorage,
  setLocalStorage,
} from '@/lib/localstorage.utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserData, LoginInputData, loginUserApi } from '@/api/auth.api';
import { ILoginResponse, IUser } from '@/@types/auth.type';

export interface IAuthStorage {
  authUser?: IUser;
  token: undefined | string;
  authenticated: boolean;
  loading: boolean;
  error: string | undefined;
}

const token = getLocalStorage('token');
const isAuthenticated:boolean = token && token.length > 0?true:false;
const initialState: IAuthStorage = {
  token: token || undefined,
  authenticated: isAuthenticated,
  loading: false,
  authUser: undefined,
  error: undefined,
};
export const AuthSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    clearState: state => {
      state.authUser = undefined;
      state.token = undefined;
      state.loading = false;
      state.authenticated = false;
      return state;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state,action) => {
        state.token = action.payload.token;
        state.authUser = action.payload.user;
        state.authenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, state => {
        state.authUser = undefined;
        state.authenticated = false;
        state.loading = false;
        state.token = undefined;
      })
      // .addCase(logoutUser.pending, state => {
      //   state.loading = true;
      // })
      // .addCase(logoutUser.fulfilled, state => {
      //   state.token = undefined;
      //   state.authenticated = false;
      //   state.loading = false;
      //   state.authUser = undefined;
      //   removeLocalStorage('token');
      // })
      // .addCase(logoutUser.rejected, state => {
      //   state.loading = false;
      // })
      .addCase(fetchAuthUser.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.authUser = action.payload.user;
        state.loading = false;
        state.authenticated = true;
      })
      .addCase(fetchAuthUser.rejected, state => {
        state.loading = false;
        state.authUser = undefined;
        state.authenticated = false;
      });
  },
});

export const loginUser = createAsyncThunk(
  'users/login',
  async (loginData: LoginInputData): Promise<ILoginResponse> => {
    const loginResult = await loginUserApi(loginData);
    console.log("LoginResult: ", loginResult)
    // return loginResult
    if (
      loginResult?.success == true
    ) {
      const _token = loginResult.data.token;
      setLocalStorage('token', _token);
      return loginResult.data;
    } else {
      throw new Error('Error logging in');
    }
  }
);

// export const logoutUser = createAsyncThunk('users/logout', async () => {
//   return logoutUser();
// });

export const fetchAuthUser = createAsyncThunk(
  'users/fetchAuthUser',
  async () => {
    const fetchData =  await getUserData();
    console.log("FetchData: ", fetchData)
    if (fetchData?.success == true) {
      return fetchData.data;
    } else {
      throw new Error('Error fetching user data');
    }
  }
);

export const { clearState } = AuthSlice.actions;
