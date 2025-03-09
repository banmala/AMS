import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@/lib/localstorage.utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserData, LoginInputData, loginUserApi, registerUserApi, UserRegisterInputData } from '@/api/auth.api';
import { ILoginResponse, IUser } from '@/@types/auth.type';
import { displaySnackbar } from './snackbar.slice';

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
      .addCase(logoutUser.pending, state => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.token = undefined;
        state.authenticated = false;
        state.loading = false;
        state.authUser = undefined;
      })
      .addCase(logoutUser.rejected, state => {
        state.loading = false;
      })
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
      })
      .addCase(registerUser.pending, state => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, state => {
        state.loading = false;
      });
  },
});

export const loginUser = createAsyncThunk(
  'users/login',
  async (loginData: LoginInputData, {dispatch}): Promise<ILoginResponse> => {
    const loginResult = await loginUserApi(loginData);
    if (
      loginResult?.success == true
    ) {
      dispatch(displaySnackbar(loginResult.message))
      const _token = loginResult.data.token;
      setLocalStorage('token', _token);
      return loginResult.data;
    } else {
      dispatch(displaySnackbar(loginResult.message))
      throw new Error('Error logging in');
    }
  }
);

export const registerUser = createAsyncThunk(
  'users/register',
  async (registerData: UserRegisterInputData, {dispatch}): Promise<any> => {
    const registerResult = await registerUserApi(registerData);
    if (
      registerResult?.success == true
    ) {
      dispatch(displaySnackbar(registerResult.message))
      return registerResult.message;
    } else {
      dispatch(displaySnackbar(registerResult.message))
      throw new Error('Error while registering');
    }
  }
);

export const logoutUser = createAsyncThunk('users/logout', async (_,{dispatch}) => {
  removeLocalStorage("token");
  dispatch(displaySnackbar("Logged out!"))
  return true;
});

export const fetchAuthUser = createAsyncThunk(
  'users/fetchAuthUser',
  async () => {
    const fetchData =  await getUserData();
    if (fetchData?.success == true) {
      return fetchData.data;
    } else {
      throw new Error('Error fetching user data');
    }
  }
);

export const { clearState } = AuthSlice.actions;
