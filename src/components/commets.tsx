import React from 'react';
import {Comment} from '../types';

interface CommentSectionProps {
  comments: Comment[];
}

const Comments: React.FC<CommentSectionProps> = ({comments}) => {
  return (
      <div className='comments mt-4'>
        <h5>Comments</h5>
        {comments.length > 0 ? (
            <div className='comments container-fluid p-2 bg-secondary rounded'>
              {comments.map((comment) => (
                  <div key={comment.id} className='card mt-2'>
                    <div className='card-body'>
                      <h6>{comment.name} <small className='text-muted'>({comment.email})</small></h6>
                      <p>{comment.body}</p>
                    </div>
                  </div>
              ))}
            </div>
        ) : (
            <p className='text-muted'>No comments available.</p>
        )}
      </div>
  );
};

export default Comments;
