import { getTopNews } from 'services/fetch';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getNews } from './../../services/fetch';

// export const newsAction = () => {
//   return async dispatch => {
//     try {
//       dispatch(newSlice.actions.fetching);
//       const data = await getTopNews();
//       dispatch(newSlice.actions.fetchSuccess(data));
//     } catch (error) {
//       dispatch(newSlice.actions.fetchError(error));
//     }
//   };
// };

export const newsAction = createAsyncThunk('news/getTopNews', async () => {
  return await getTopNews();
});

export const getNewsBySearch = createAsyncThunk(
  'news/getNewsBySearch',
  async text => {
    return await getNews(text);
  }
);

//=========== +++++++++++
const newsFuncArr = [newsAction, getNewsBySearch];
const fn = type => newsFuncArr.map(el => el[type]);
//=========== +++++++++++

const handlePending = (state, action) => {
  state.status = 'pending';
};
const handleFulfilled = (state, action) => {
  state.status = 'resolved';
  state.news = action.payload.articles;
  state.error = '';
};
const handleRejected = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const initialState = {
  news: null,
  status: 'idle',
  error: '',
};

const newSlice = createSlice({
  name: 'news',
  initialState,
  // === 1 ====
  //   reducers: {
  //     fetching: (state, action) => {
  //       state.isLoading = true;
  //     },
  //     fetchSuccess: (state, action) => {
  //       state.isLoading = false;
  //       state.news = action.payload.articles;
  //       state.error = '';
  //     },
  //     fetchError: (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     },
  //   },
  // ===== 2  ============
  //   extraReducers: {
  //     [newsAction.pending]: (state, action) => {
  //       state.isLoading = true;
  //     },
  //   [newsAction.fulfilled]: (state, action) => {
  //     state.isLoading = false;
  //     state.news = action.payload.articles;
  //     state.error = '';
  //   },
  //   [newsAction.rejected]: (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },
  //   },
  //=========  3  ==============
  //   extraReducers: builder => {
  //     builder
  //       .addCase(newsAction.pending, (state, action) => {
  //         state.isLoading = true;
  //       })
  //       .addCase(newsAction.fulfilled, (state, action) => {
  //         state.isLoading = false;
  //         state.news = action.payload.articles;
  //         state.error = '';
  //       })
  //       .addCase(newsAction.rejected, (state, action) => {
  //         state.isLoading = false;
  //         state.error = action.payload;
  //       });
  //   },
  //====== 4 ==========================
  //   extraReducers: builder => {
  //     builder
  //       .addCase(newsAction.pending, handlePending)
  //       .addCase(newsAction.fulfilled, handleFulfilled)
  //       .addCase(newsAction.rejected, handleRejected)

  //       .addCase(getNewsBySearch.pending, handlePending)
  //       .addCase(getNewsBySearch.fulfilled, handleFulfilled)
  //       .addCase(getNewsBySearch.rejected, handleRejected);
  //   },
  //=========  5  =====================
  //   extraReducers: builder => {
  //     builder
  //       .addMatcher(
  //         isAnyOf([newsAction.pending, getNewsBySearch.pending]),
  //         handlePending
  //       )
  //       .addMatcher(
  //         isAnyOf([newsAction.fulfilled, getNewsBySearch.fulfilled]),
  //         handleFulfilled
  //       )
  //       .addMatcher(
  //         isAnyOf([newsAction.rejected, getNewsBySearch.rejected]),
  //         handleRejected
  //       );
  //   },
  //=========== +++++++++++
  extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(...fn('pending')), handlePending)
      .addMatcher(isAnyOf(...fn('fulfilled')), handleFulfilled)
      .addMatcher(isAnyOf(...fn('rejected')), handleRejected);
  },
});

export const newReducer = newSlice.reducer;
