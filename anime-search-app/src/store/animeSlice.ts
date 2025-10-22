import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Anime, AnimeState } from '../types/anime';

const initialState: AnimeState = {
  items: [],
  loading: false,
  error: null,
  searchQuery: '',
  currentPage: 1,
  hasNextPage: false,
};

export const searchAnime = createAsyncThunk(
  'anime/search',
  async ({ query, page = 1 }: { query: string; page?: number }) => {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${query}&page=${page}&limit=12`
    );
    return response.data;
  }
);

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.hasNextPage = action.payload.pagination.has_next_page;
      })
      .addCase(searchAnime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search anime';
      });
  },
});

export const { setSearchQuery, setCurrentPage } = animeSlice.actions;
export default animeSlice.reducer;