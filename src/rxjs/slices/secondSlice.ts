import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Comment} from "../../types.ts";

export const secondAsyncAction = createAsyncThunk<Comment[], number>(
    'secondSlice/secondAsyncAction',
    async (postId: number) => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      return await response.json() as Promise<Comment[]>;
    }
);

export type SecondAsyncActionFulfilled = ReturnType<typeof secondAsyncAction.fulfilled>;

interface SecondSliceState {
  data: Comment[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const secondSlice = createSlice({
  name: 'secondSlice',
  initialState: { data: null, status: 'idle' } as SecondSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(secondAsyncAction.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(secondAsyncAction.fulfilled, (state, action: PayloadAction<Comment[]>) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(secondAsyncAction.rejected, (state) => {
          state.status = 'failed';
        });
  },
});

export default secondSlice.reducer;
