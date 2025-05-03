import React, { useState, useContext } from 'react';
import '../assets/css/loginRegister.css';
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
    // Buscar el usuario completo en la lista de usuarios
    const user = users.find((u) => u.email === formData.email);
    if (user) {
      loginUser(user);
      setSuccessMessage('Inicio de sesión exitoso');
    } else {
      setError('Usuario no encontrado');
  
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
        setError('Error al registrar usuario');
      }
    } else {
      // Login logic placeholder
      if (!formData.email || !formData.password) {
        setError('Por favor ingresa email y contraseña');
        return;
      }
      
      // Here you would implement login logic, e.g., call backend login endpoint
      // For now, simulate login by checking if user exists in users list
      const user = loggedInUser || null;
      if (!user) {
        // Simulate login success by setting loggedInUser
        loginUser({ email: formData.email });
        setSuccessMessage('Inicio de sesión exitoso');
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
      <div className="login-register-container">
        <h2>Bienvenido, {loggedInUser.email}</h2>
        <button onClick={handleLogout} className="btn-submit">
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
