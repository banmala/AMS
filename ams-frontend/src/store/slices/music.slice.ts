import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMusic } from '@/@types/music.type';
import { createMusicApi, deleteMusicById, fetchMusicByArtistId, fetchMusicDetailById, getAllMusicData, updateMusicApi } from '@/api/music.api';
import { displaySnackbar } from './snackbar.slice';

interface musicState {
  data: {
    items: IMusic[];
  };
  loading: boolean;
  error: string | undefined;
  detail?: IMusic;
}
const initialState: musicState = {
  data: {
    items: [],
  },
  loading: false,
  error: undefined,
};

export const MusicSlice = createSlice({
  name: 'music',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createMusic.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(createMusic.fulfilled, (state, action) => {
        state.loading = false;
        state.data.items = action.payload.musics;
      })
      .addCase(createMusic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getMusics.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getMusics.fulfilled, (state, action) => {
        state.loading = false;
        state.data.items = action.payload;
      })
      .addCase(getMusics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMusicByArtist.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchMusicByArtist.fulfilled, (state, action) => {
        state.loading = false;
        state.data.items = action.payload;
      })
      .addCase(fetchMusicByArtist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMusicById.pending, state => {
        state.loading = true;
      })
      .addCase(fetchMusicById.fulfilled, (state, action) => {
        state.loading = false;
        state.detail=action.payload
      })
      .addCase(fetchMusicById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.detail=undefined
      })
      .addCase(deleteMusic.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(deleteMusic.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteMusic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateMusic.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(updateMusic.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateMusic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ;
  },
});

export const createMusic = createAsyncThunk(
  'music/createMusic',
  async (data:IMusic,{dispatch}): Promise<any> => {
    try {
      const allMusics =  await createMusicApi(data);
      dispatch(displaySnackbar(allMusics.message));
      return allMusics.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      dispatch(displaySnackbar("Something went wrong!"));
      return ;
    }
  }
);


export const getMusics = createAsyncThunk(
  'music/getMusics',
  async (_,{dispatch}): Promise<any> => {
    try {
      const allMusics =  await getAllMusicData();
      dispatch(displaySnackbar(allMusics.message));
      return allMusics.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      dispatch(displaySnackbar("Something went wrong!"));
      return ;
    }
  }
);

export const fetchMusicById = createAsyncThunk(
  'musics/fetchMusicById',
  async (id:number,{dispatch}) => {
    console.log("id: ", id)
    const fetchData =  await fetchMusicDetailById(id);
    if (fetchData?.success == true) {
      dispatch(displaySnackbar(fetchData.message));
      return fetchData.data[0];
    } else {
      dispatch(displaySnackbar(fetchData.message));
      throw new Error('Error fetching music data');
    }
  }
);

export const fetchMusicByArtist = createAsyncThunk(
  'musics/fetchMusicByArtistId',
  async (artistId:number,{dispatch}) => {
    const fetchData =  await fetchMusicByArtistId(artistId);
    if (fetchData?.success == true) {
      dispatch(displaySnackbar(fetchData.message));
      return fetchData.data;
    } else {
      dispatch(displaySnackbar(fetchData.message));
      throw new Error('Error fetching music data');
    }
  }
);

export const updateMusic = createAsyncThunk(
  'music/updateMusic',
  async ({data,musicId}:{data: IMusic,musicId:number}, { rejectWithValue, dispatch }) => {
    try {
      const updateResult = await updateMusicApi(data, musicId);
      dispatch(displaySnackbar(updateResult.message))
      return updateResult;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      dispatch(displaySnackbar("Something went wrong!"));
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const deleteMusic = createAsyncThunk(
    'music/deleteMusic',
    async (id:number, { rejectWithValue, dispatch }) => {
      try {
        const deleteResult = await deleteMusicById(id);
        dispatch(displaySnackbar(deleteResult.message))
        return deleteResult;
      } catch (err: any) {
        if (!err.response) {
          throw err;
        }
        dispatch(displaySnackbar("Something went wrong!"));
        return rejectWithValue(err.response.data.errors);
      }
    }
  );  