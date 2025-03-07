import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IArtist } from '@/@types/artist.type';
import { createArtistApi, deleteArtistById, fetchArtistDetailById, getAllArtistData, updateArtistApi } from '@/api/artist.api';

interface artistState {
  data: {
    items: IArtist[];
    search?: string;
    desc?: boolean;
  };
  loading: boolean;
  error: string | undefined;
  detail?: IArtist;
}
const initialState: artistState = {
  data: {
    items: [],
  },
  loading: false,
  error: undefined,
};

export const ArtistSlice = createSlice({
  name: 'artist',
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
      .addCase(createArtist.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(createArtist.fulfilled, (state, action) => {
        state.loading = false;
        state.data.items = action.payload.artists;
      })
      .addCase(createArtist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getArtists.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getArtists.fulfilled, (state, action) => {
        state.loading = false;
        state.data.items = action.payload.artists;
      })
      .addCase(getArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchArtistById.pending, state => {
        state.loading = true;
      })
      .addCase(fetchArtistById.fulfilled, (state, action) => {
        state.loading = false;
        state.detail=action.payload.artist
      })
      .addCase(fetchArtistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.detail=undefined
      })
      .addCase(updateArtist.pending, state => {
        state.loading = true;
      })
      .addCase(updateArtist.fulfilled, (state, action) => {
        state.loading = false;
        state.data.items = action.payload.artists;
      })
      .addCase(updateArtist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteArtist.pending, state => {
        state.loading = true;
      })
      .addCase(deleteArtist.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteArtist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ;
  },
});

export const createArtist = createAsyncThunk(
  'artist/createArtist',
  async (data:IArtist): Promise<any> => {
    try {
      const allArtists =  await createArtistApi(data);
      return allArtists.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return ;
    }
  }
);


export const getArtists = createAsyncThunk(
  'artist/getArtists',
  async (): Promise<any> => {
    try {
      const allArtists =  await getAllArtistData();
      return allArtists.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return ;
    }
  }
);

export const fetchArtistById = createAsyncThunk(
  'artists/fetchArtistById',
  async (id:number) => {
    const fetchData =  await fetchArtistDetailById(id);
    if (fetchData?.success == true) {
      return fetchData.data;
    } else {
      throw new Error('Error fetching artist data');
    }
  }
);

export const updateArtist = createAsyncThunk(
  'artist/updateArtist',
  async ({data,artistId}:{data: IArtist,artistId:number}, { rejectWithValue }) => {
    try {
      return await updateArtistApi(data, artistId);
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const deleteArtist = createAsyncThunk(
    'artist/deleteArtist',
    async (id:number, { rejectWithValue }) => {
      try {
        return await deleteArtistById(id);
      } catch (err: any) {
        if (!err.response) {
          throw err;
        }
        return rejectWithValue(err.response.data.errors);
      }
    }
  );  