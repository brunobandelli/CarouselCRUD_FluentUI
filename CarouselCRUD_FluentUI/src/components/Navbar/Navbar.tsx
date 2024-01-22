import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/log.png';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '70px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        boxShadow: '0px 2px 5px 0px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ height: '30px', padding: '15px' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '50px', flex: 1, justifyContent: 'center' }}>
        <NavLink to="/" active={location.pathname === '/'}>
          Slider
        </NavLink>
        <NavLink to="/cadastro" active={location.pathname === '/cadastro'}>
          Cadastro
        </NavLink>
      </div>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  const linkStyle: React.CSSProperties = {
    fontSize: '16px',
    color: 'gray',
    textDecoration: 'none',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    position: 'relative',
  };

  const lineStyle: React.CSSProperties = {
    height: '2px',
    width: '70%', 
    backgroundColor: active ? '#FFA500' : 'transparent',
    transition: 'background-color 0.3s ease',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  };

  return (
    <Link to={to} style={linkStyle}>
      {children}
      <div style={lineStyle} />
    </Link>
  );
};

export default Navbar;
