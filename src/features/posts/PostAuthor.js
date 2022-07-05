import { useSelector } from 'react-redux';

import { selectUserById } from '../users/usersSlice';

const PostAuthor = ({ idUser }) => {
  /* const author = useSelector((state) =>
    state.users.find((user) => user.id === idUser)
  );*/
  const author = useSelector((state) => selectUserById(state, idUser));

  return <span>by {author ? author.name : 'Unknow author'}</span>;
};

export default PostAuthor;
