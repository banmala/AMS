import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMusic } from '@/@types/music.type';
import { createMusicApi, deleteMusicById, fetchMusicByArtistId, fetchMusicDetailById, getAllMusicData, updateMusicApi } from '@/api/music.api';

interface musicState {
  data: {
    items: IMusic[];
    search?: string;
    desc?: boolean;
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
        state.data.items = action.payload.musics;
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
        state.data.items = action.payload.musics;
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
        state.detail=action.payload.music
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
        state.data.items = action.payload.musics;
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
        state.data.items = action.payload.musics;
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
  async (data:IMusic): Promise<any> => {
    try {
      const allMusics =  await createMusicApi(data);
      return allMusics.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return ;
    }
  }
);


export const getMusics = createAsyncThunk(
  'music/getMusics',
  async (): Promise<any> => {
    try {
      const allMusics =  await getAllMusicData();
      return allMusics.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return ;
    }
  }
);

export const fetchMusicById = createAsyncThunk(
  'musics/fetchMusicById',
  async (id:number) => {
    const fetchData =  await fetchMusicDetailById(id);
    if (fetchData?.success == true) {
      return fetchData.data;
    } else {
      throw new Error('Error fetching music data');
    }
  }
);

export const fetchMusicByArtist = createAsyncThunk(
  'musics/fetchMusicByArtistId',
  async (artistId:number) => {
    const fetchData =  await fetchMusicByArtistId(artistId);
    if (fetchData?.success == true) {
      return fetchData.data;
    } else {
      throw new Error('Error fetching music data');
    }
  }
);

export const updateMusic = createAsyncThunk(
  'music/updateMusic',
  async ({data,musicId}:{data: IMusic,musicId:number}, { rejectWithValue }) => {
    try {
      return await updateMusicApi(data, musicId);
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const deleteMusic = createAsyncThunk(
    'music/deleteMusic',
    async (id:number, { rejectWithValue }) => {
      try {
        return await deleteMusicById(id);
      } catch (err: any) {
        if (!err.response) {
          throw err;
        }
        return rejectWithValue(err.response.data.errors);
      }
    }
  );  