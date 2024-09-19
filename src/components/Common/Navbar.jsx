import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../store/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <nav>
      <div>
        <Link to="/">
          Logo
        </Link>
        <div>
          {user ? (
            <>
              <Link to="/profile">
                Profile
              </Link>
              <button onClick={handleSignOut}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth">
              Login / Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;