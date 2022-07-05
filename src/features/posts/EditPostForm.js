import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { postUpdated, selectPostById } from './postsSlice';

export const EditPostForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { idPost } = useParams();

  const post = useSelector((state) => selectPostById(state, idPost)); //state.posts.find((post) => post.id === idPost)

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: idPost, title, content }));
      navigate(`/posts/${idPost}`);
    }
  };

  return (
    <section className="container mt-5">
      <h2>Edit Post</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="postTitle" className="form-label">
            Post Title:
          </label>
          <input
            className="form-control"
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postContent" className="form-label">
            Content:
          </label>
          <textarea
            className="form-control"
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
        </div>
        <button
          className="btn btn-primary"
          type="button"
          onClick={onSavePostClicked}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};
