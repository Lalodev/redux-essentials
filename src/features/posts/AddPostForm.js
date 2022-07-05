import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewPost } from './postsSlice';

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [idUser, setIdUser] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setIdUser(e.target.value);

  /*const canSave = Boolean(title) && Boolean(content) && Boolean(idUser);*/
  const canSave =
    [title, content, idUser].every(Boolean) && addRequestStatus === 'idle';

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        await dispatch(addNewPost({ title, content, user: idUser })).unwrap();
        setTitle('');
        setContent('');
        setIdUser('');
        navigate(`/`);
      } catch (err) {
        console.error('Failed to save the post: ', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className="container mt-5">
      <h2>Add a New Post</h2>
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
          <label htmlFor="postAuthor" className="form-label">
            Author:
          </label>
          <select
            id="postAuthor"
            value={idUser}
            className="form-select"
            onChange={onAuthorChanged}
          >
            <option value="">Select an author...</option>
            {usersOptions}
          </select>
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
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};
