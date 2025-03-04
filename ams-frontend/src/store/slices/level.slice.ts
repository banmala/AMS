// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { RootState } from '..';
// import LevelApi, { ILevelResponseWithPagination } from '@app/apis/Level';
// import { toast } from '@app/shadcn/ui/use-toast';
// import { ILevels } from '@app/@types/entity/ILevels';
// interface levelState {
//   data: {
//     items: ILevels[];
//     totalPage: number;
//     currentPage: number;
//     size: number;
//     extraFilters?: string;
//     search?: string;
//     desc: boolean;
//   };
//   loading: boolean;
//   error: string | undefined;
//   fieldErrorList: Partial<Record<keyof ILevels, string[]>>;
//   detail?: ILevels;
// }
// const initialState: levelState = {
//   data: {
//     items: [],
//     totalPage: 0,
//     currentPage: 1,
//     size: 10,
//     desc: false,
//   },
//   loading: false,
//   error: undefined,
//   fieldErrorList: {},
// };

// export const LevelSlice = createSlice({
//   name: 'levels',
//   initialState: initialState,
//   reducers: {
//     setQuery: (state, action) => {
//       state.data.search = action.payload;
//     },
//     setCurrentPage: (state, action) => {
//       state.data.currentPage = action.payload;
//     },
//     setSize: (state, action) => {
//       state.data.size = action.payload;
//     },
//     resetTable: state => {
//       state.data.search = '';
//       state.data.currentPage = 1;
//       state.data.size = 10;
//     },
//     clearErrors: state => {
//       state.fieldErrorList = {};
//     },
//     setOrder: (state, action) => {
//       state.data.desc = action.payload === 'desc' ? true : false;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(getLevels.pending, state => {
//         state.loading = true;
//         state.error = '';
//       })
//       .addCase(getLevels.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data.items = action.payload.data.items;
//         state.data.totalPage = action.payload.data.totalPage || 1;
//       })
//       .addCase(getLevels.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(createLevel.pending, state => {
//         state.loading = true;
//         state.error = '';
//         state.fieldErrorList = {};
//       })
//       .addCase(createLevel.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data.items.concat(action.payload.data);
//         state.fieldErrorList = {};
//         toast({ description: 'Level Created Successfullly.' });
//       })
//       .addCase(createLevel.rejected, (state, action) => {
//         state.loading = false;
//         state.fieldErrorList = action.payload as object;
//       })
//       .addCase(updateLevel.pending, state => {
//         state.loading = true;
//         state.error = '';
//         state.fieldErrorList = {};
//       })
//       .addCase(updateLevel.fulfilled, state => {
//         state.loading = false;
//         state.fieldErrorList = {};
//         toast({ description: 'Level Updated Successfullly.' });
//       })
//       .addCase(updateLevel.rejected, (state, action) => {
//         state.loading = false;
//         state.fieldErrorList = action.payload as object;
//       })
//       .addCase(fetchLevelDetail.pending, state => {
//         state.loading = true;
//         state.error = '';
//       })
//       .addCase(fetchLevelDetail.fulfilled, (state, action) => {
//         state.loading = false;
//         state.detail = action.payload;
//       })
//       .addCase(fetchLevelDetail.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const getLevels = createAsyncThunk(
//   'level/getLevels',
//   async (userData, { getState }): Promise<ILevelResponseWithPagination> => {
//     const state = (getState() as RootState).levels;
//     return await LevelApi.get({
//       currentPage: state.data.currentPage,
//       size: state.data.size,
//       search: state.data.search,
//       desc: state.data.desc,
//     });
//   }
// );

// export const createLevel = createAsyncThunk(
//   'level/createLevel',
//   async (data: ILevels, { rejectWithValue }) => {
//     try {
//       return await LevelApi.create(data);
//     } catch (err: any) {
//       if (!err.response) {
//         throw err;
//       }
//       return rejectWithValue(err.response.data.errors);
//     }
//   }
// );

// export const updateLevel = createAsyncThunk(
//   'level/updateLevel',
//   async (data: ILevels, { rejectWithValue }) => {
//     try {
//       return await LevelApi.update(data);
//     } catch (err: any) {
//       if (!err.response) {
//         throw err;
//       }
//       return rejectWithValue(err.response.data.errors);
//     }
//   }
// );

// export const fetchLevelDetail = createAsyncThunk(
//   'level/fetchLevelDetail',
//   async (itemId: string): Promise<ILevels> => {
//     return LevelApi.fetchDetail(itemId);
//   }
// );
