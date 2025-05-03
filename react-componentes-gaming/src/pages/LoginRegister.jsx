import React, { useState, useContext } from 'react';
import '../assets/css/profileAndLoginStyles.css';
import { UserContext } from '../context/UserContext';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { addUser, users, loggedInUser, loginUser, logoutUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
    setSuccessMessage(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    if (!formData.email || !formData.password) {
      setError('Por favor ingresa email y contraseña');
      return;
    }

    if (!isLogin) {
      // Registration validation
      if (formData.password !== formData.confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
      if (!formData.name || !formData.email || !formData.password) {
        setError('Por favor completa todos los campos');
        return;
      }
      try {
        await addUser({
          username: formData.name,
          email: formData.email,
          password: formData.password,
        });
        setSuccessMessage('Usuario registrado con éxito');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setIsLogin(true);
      } catch (err) {
        // Show specific error message from addUser if available
        setError(err.message || 'Error al registrar usuario');
      }
    } else {
      // Login logic: call backend login endpoint
      try {
        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });
        const data = await response.json();
        if (!response.ok) {
          setError(data.error || 'Error en el inicio de sesión');
          return;
        }
        loginUser(data);
        setSuccessMessage('Inicio de sesión exitoso');
      } catch (err) {
        setError('Error en el inicio de sesión');
      }
    }
  };

  const handleLogout = () => {
    logoutUser();
    setSuccessMessage(null);
    setError(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setIsLogin(true);
  };

  if (loggedInUser) {
    return (
      <div className="welcome-container">
        <h2 className="welcome-message">Bienvenido, {loggedInUser.email}</h2>
        <button onClick={handleLogout} className="btn-submit btn-logout">
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="login-register-container">
      <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="mb-3">
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              id="name"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="nombre@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {!isLogin && (
          <div className="mb-3">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirmar Contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" className="btn-submit">
          {isLogin ? 'Entrar' : 'Registrarse'}
        </button>
      </form>
      <div className="toggle-button">
        <button onClick={toggleForm} type="button">
          {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
    </div>
  );
};

export default LoginRegister;
