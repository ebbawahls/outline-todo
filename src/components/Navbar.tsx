import { Link } from 'react-router-dom';
import logo from '../assets/outline-logo.svg';

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Outline logo" />
        </Link>
      </div>

      <div className="navLinks">
        <Link to="/">Home</Link>

        <Link to="/lists">Lists</Link>
      </div>
    </nav>
  );
}
