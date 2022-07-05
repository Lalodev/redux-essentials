import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchNotifications } from '../features/notifications/notificationsSlice';

export const Navbar = () => {
  const dispatch = useDispatch();

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <span className="me-2">
          <Link to="/">Posts</Link>
        </span>
        <span className="me-2">
          <Link to="/new">New</Link>
        </span>
        <span className="me-2">
          <Link to="/users">Users</Link>
        </span>
        <span className="me-2">
          <Link to="/notifications">Notifications</Link>
        </span>
        <button
          className="btn btn-light border text-end"
          onClick={fetchNewNotifications}
        >
          Refresh Notifications
        </button>
      </section>
      <hr />
    </nav>
  );
};
