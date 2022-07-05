import { Routes, Route } from 'react-router-dom';

import { Navbar } from './app/Navbar';
import { AddPostForm } from './features/posts/AddPostForm';
import { PostsList } from './features/posts/PostsList';
import { SinglePostPage } from './features/posts/SinglePostPage';
import { EditPostForm } from './features/posts/EditPostForm';
import { UsersList } from './features/users/UsersList';
import { UserPage } from './features/users/UserPage';
import { NotificationsList } from './features/notifications/NotificationsList';

function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/new" element={<AddPostForm />} />
        <Route path="/posts/:idPost" element={<SinglePostPage />} />
        <Route path="/edit/:idPost" element={<EditPostForm />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:idUser" element={<UserPage />} />
        <Route path="/notifications" element={<NotificationsList />} />
      </Routes>
    </div>
  );
}

export default App;
