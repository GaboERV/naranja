import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">inicio de sesion</Link>
      <Link to="/Registro">Registro</Link>
      <Link to="/Dashboard">Dashboard</Link>
    </nav>
  );
};

export default Navbar;
