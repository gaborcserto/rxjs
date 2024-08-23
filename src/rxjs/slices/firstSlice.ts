import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post} from "../../types.ts";

export const firstAsyncAction = createAsyncThunk<Post[]>('firstSlice/firstAsyncAction', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return await response.json() as Promise<Post[]>;
});


export type FirstAsyncActionFulfilled = ReturnType<typeof firstAsyncAction.fulfilled>;

interface FirstSliceState {
  data: Post[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const firstSlice = createSlice({
  name: 'firstSlice',
  initialState: { data: null, status: 'idle' } as FirstSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(firstAsyncAction.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(firstAsyncAction.fulfilled, (state, action: PayloadAction<Post[]>) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(firstAsyncAction.rejected, (state) => {
          state.status = 'failed';
        });
  },
});

export default firstSlice.reducer;
