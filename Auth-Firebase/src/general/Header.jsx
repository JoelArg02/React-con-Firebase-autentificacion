import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faKey } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';

const Header = ({ userName, onLogout }) => {
  const navigate = useNavigate();

  const handleBrandClick = (e) => {
    e.preventDefault(); 
    if (userName) {
      navigate('/home'); 
    } else {
      navigate('/'); 
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/" onClick={handleBrandClick}>Mi App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {userName ? (
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  <FontAwesomeIcon icon={faUser} /> {userName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/change-password">
                    <FontAwesomeIcon icon={faKey} /> Cambiar contraseña
                  </Dropdown.Item>
                  <Dropdown.Item onClick={onLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/register">Registro</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Iniciar Sesión</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
