import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IArtist } from '@/@types/artist.type';
import { createArtistApi, deleteArtistById, fetchArtistDetailById, getAllArtistData, updateArtistApi } from '@/api/artist.api';
import { displaySnackbar } from './snackbar.slice';

interface artistState {
  data: {
    items: IArtist[];
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
  reducers: {},
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
        state.data.items = action.payload;
      })
      .addCase(getArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchArtistById.pending, state => {
        state.loading = true;
      })
      .addCase(fetchArtistById.fulfilled, (state, action) => {
        console.log("action.payload: ", action.payload)
        state.loading = false;
        state.detail=action.payload
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
  async (data:IArtist,{dispatch}): Promise<any> => {
    try {
      const allArtists =  await createArtistApi(data);
      dispatch(displaySnackbar(allArtists.message))
      return allArtists.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      dispatch(displaySnackbar("Something went wrong!"))
      return ;
    }
  }
);


export const getArtists = createAsyncThunk(
  'artist/getArtists',
  async (_,{dispatch}): Promise<any> => {
    try {
      const allArtists =  await getAllArtistData();
      dispatch(displaySnackbar(allArtists.message))
      return allArtists.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      dispatch(displaySnackbar("Something went wrong!"))
      return ;
    }
  }
);

export const fetchArtistById = createAsyncThunk(
  'artists/fetchArtistById',
  async (id:number,{dispatch}) => {
    const fetchData =  await fetchArtistDetailById(id);
    if (fetchData?.success == true) {
      dispatch(displaySnackbar(fetchData.message))
      return fetchData.data[0];
    } else {
      dispatch(displaySnackbar("Something went wrong!"))
      throw new Error('Error fetching artist data');
    }
  }
);

export const updateArtist = createAsyncThunk(
  'artist/updateArtist',
  async ({data,artistId}:{data: IArtist,artistId:number}, { rejectWithValue, dispatch }) => {
    try {
      const updateResult =  await updateArtistApi(data, artistId);
      dispatch(displaySnackbar(updateResult.message))
      return updateResult;
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
    async (id:number, { rejectWithValue, dispatch }) => {
      try {
        const deleteResult =  await deleteArtistById(id);
        dispatch(displaySnackbar(deleteResult.message))
        return deleteResult;
      } catch (err: any) {
        if (!err.response) {
          throw err;
        }
        return rejectWithValue(err.response.data.errors);
      }
    }
  );  