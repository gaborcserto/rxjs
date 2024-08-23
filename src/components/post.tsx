import React from 'react';
import Comments from './commets';
import { Post as PostType, Comment } from '../types';

interface PostProps {
  post: PostType;
  comments: Comment[];
  showComments?: boolean;
}

const Posts: React.FC<PostProps> = ({ post, comments, showComments = false }) => {
  console.log('comments', comments);

  return (
      <div className='card mb-4'>
        <div className='card-body'>
          <h3 className='card-title'>{post.title}</h3>
          <p className='card-text'>{post.body}</p>
          {showComments && <Comments comments={comments} />}
        </div>
      </div>
  );
};

export default Posts;
