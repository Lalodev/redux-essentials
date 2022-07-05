import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectPostById } from './postsSlice';

import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import PostAuthor from './PostAuthor';

export const SinglePostPage = () => {
  const { idPost } = useParams();

  const post = useSelector((state) => selectPostById(state, idPost));
  //state.posts.find((post) => post.id === idPost)

  if (!post) {
    return (
      <section className="container">
        <article className="border border-secondary rounded my-5 p-3">
          <h2 className="text-danger">Post not found!</h2>
        </article>
      </section>
    );
  }

  return (
    <section className="container mt-5">
      <article className="border border-secondary rounded my-2 p-3 bg-secondary bg-opacity-10">
        <h2 className="text-success">{post.title}</h2>
        <div>
          <PostAuthor idUser={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p>{post.content}</p>
        <ReactionButtons post={post} />
        <div className="text-center my-2">
          <Link to={`/edit/${post.id}`}>Edit</Link>
        </div>
      </article>
    </section>
  );
};
