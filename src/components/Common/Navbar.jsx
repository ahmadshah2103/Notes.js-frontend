import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();

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
              <button onClick={signOut}>
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