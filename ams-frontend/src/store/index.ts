import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AuthSlice } from './slices/auth.slice';
import { UserSlice } from './slices/user.slice';
import { ArtistSlice } from './slices/artist.slice';
import { MusicSlice } from './slices/music.slice';
import { SnackbarSlice } from './slices/snackbar.slice';


/**
 * REDUX STORE
 */
const store = configureStore({
  devTools: true,
  reducer: combineReducers({
    auth: AuthSlice.reducer,
    user: UserSlice.reducer,
    artist: ArtistSlice.reducer,
    music: MusicSlice.reducer,
    snackbar:SnackbarSlice.reducer,
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
