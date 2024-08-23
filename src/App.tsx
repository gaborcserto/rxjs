import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './rxjs/store';
import { firstAsyncAction } from './rxjs/slices/firstSlice';
import Layout from './layout/layout';
import Posts from './components/post';
import { Post as PostType } from './types';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const firstState = useSelector((state: RootState) => state.first);
  const secondState = useSelector((state: RootState) => state.second);

  const posts = firstState.data ?? [];
  const commentsByPostId = secondState.data ?? [];

  return (
      <Layout>
        <h1>RxJS Example</h1>
        <button className="btn btn-primary" onClick={() => dispatch(firstAsyncAction())}>
          Load Posts
        </button>
        <div>
          <h2>First Slice Data (Posts)</h2>
          {posts.map((post: PostType, index: number) => (
              <Posts
                  key={post.id}
                  post={post}
                  comments={commentsByPostId}
                  showComments={index === 0}
              />
          ))}
        </div>
      </Layout>
  );
}

export default App;
