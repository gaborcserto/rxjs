import { combineEpics, Epic } from 'redux-observable';
import { of, Observable } from 'rxjs';
import { catchError, filter, mergeMap } from 'rxjs/operators';
import { PayloadAction } from '@reduxjs/toolkit';
import { firstAsyncAction } from './slices/firstSlice';
import { secondAsyncAction } from './slices/secondSlice';
import { Post } from '../types.ts';
import { RootState } from './store';

const handleError = (error: unknown): PayloadAction[] => {
  console.error(error);
  // Handle specific error cases if needed
  return [];
};

const firstToSecondEpic: Epic<PayloadAction, any, RootState> = (
    action$: Observable<PayloadAction>
) =>
    action$.pipe(
        filter(firstAsyncAction.fulfilled.match),
        mergeMap((action) => {
          const posts = action.payload as Post[];
          if (posts.length > 0) {
            const postId = posts[0].id;
            return of(secondAsyncAction(postId));
          }
          return of({ type: 'NO_POSTS_FOUND' } as PayloadAction);
        }),
        catchError(handleError)
    );

export const rootEpic = combineEpics(firstToSecondEpic);