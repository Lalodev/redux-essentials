import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { selectUserById } from '../users/usersSlice';
import { selectPostsByUser } from '../posts/postsSlice'; //selectAllPosts

export const UserPage = () => {
  const { idUser } = useParams();

  const user = useSelector((state) => selectUserById(state, idUser));

  /*const postsForUser = useSelector((state) => {
    const allPosts = selectAllPosts(state);
    return allPosts.filter((post) => post.user === idUser);
  });*/
  const postsForUser = useSelector((state) => selectPostsByUser(state, idUser));

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  );
};
