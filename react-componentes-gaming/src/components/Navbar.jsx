import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../context/UserContext';
import '../assets/css/navbar.css';
import '../assets/css/searchSuggestionsAlt.css';
import allProducts from '../data/products';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const { loggedInUser } = useContext(UserContext);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSuggestions([]);
    } else {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    }
  };

  const handleSuggestionClick = (id) => {
    setSearchTerm('');
    setSuggestions([]);
    navigate(`/product/${id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid d-flex align-items-center justify-content-center position-relative">
        <div className="d-flex align-items-center position-absolute start-0">
          <Link className="navbar-brand" to="/">
            <img src="/images/cropped-Idea-Logo-1.png" className="nav__img" alt="Logo de ComponentesGaming" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded={!isNavCollapsed ? true : false}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" end>
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Componentes
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/motherboards">
                      Motherboards
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/processors">
                      Procesadores
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/videocards">
                      Placas de video
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contactanos
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div ref={searchRef} className="navbar-search-form position-relative" style={{ maxWidth: '500px', width: '100%' }}>
          <form role="search" onSubmit={handleSearchSubmit} className="d-flex">
            <input
              className="form-control"
              type="search"
              placeholder="Buscar productos"
              aria-label="Buscar productos"
              value={searchTerm}
              onChange={handleSearchChange}
              autoComplete="off"
            />
            <button className="btn btn-outline-light" type="submit">
              Buscar
            </button>
          </form>
          {suggestions.length > 0 && (
            <ul className="list-group position-absolute w-100" style={{ zIndex: 1050 }}>
              {suggestions.map((product) => (
                <li
                  key={product.id}
                  className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
                  onClick={() => handleSuggestionClick(product.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <span>{product.name}</span>
                  <img
                    src={product.images && product.images.length > 0 ? product.images[0] : ''}
                    alt={product.name}
                    style={{ width: '40px', height: '40px', objectFit: 'contain', marginLeft: '10px' }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="d-flex align-items-center position-absolute end-0">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart" aria-label="Carrito de compras">
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              </NavLink>
            </li>
            <li className="nav-item">
              {loggedInUser ? (
                <NavLink className="nav-link" to="/profile" aria-label="Perfil">
                  Mi Perfil
                </NavLink>
              ) : (
                <NavLink className="nav-link" to="/login" aria-label="Login/Register">
                  Login / Registro
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

