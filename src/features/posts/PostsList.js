import React, { useEffect } from 'react';
import { Spinner } from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PostAuthor from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
//import { fetchPosts, selectAllPosts } from './postsSlice';
import {
  /*selectAllPosts,*/
  fetchPosts,
  selectPostIds,
  selectPostById,
} from './postsSlice';

let PostExcerpt = ({ idPost /*post*/ }) => {
  const post = useSelector((state) => selectPostById(state, idPost));
  return (
    <article key={post.id} className="border border-secondary rounded my-5 p-3">
      <h3 className="text-success">{post.title}</h3>
      <div>
        <PostAuthor idUser={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p>{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <div className="text-center my-2">
        <Link to={`/posts/${post.id}`}>View</Link>
      </div>
    </article>
  );
};
PostExcerpt = React.memo(PostExcerpt);

export const PostsList = () => {
  const dispatch = useDispatch();
  //const posts = useSelector(selectAllPosts);
  const orderedPostIds = useSelector(selectPostIds);

  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />;
  } else if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    /*const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));*/
    content = orderedPostIds.map((idPost) => (
      <PostExcerpt key={idPost} idPost={idPost} />
    ));
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <section className="container mt-5">
      <h2>Posts</h2>
      <div>{content}</div>
    </section>
  );
};
