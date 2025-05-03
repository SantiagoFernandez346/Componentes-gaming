import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

const Users = () => {
  const { users, loading, error, addUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation for email and password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Por favor, ingrese un correo electrónico válido');
      return;
    }
    if (formData.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    addUser(formData);
    setFormData({ username: '', email: '', password: '' });
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      {loading && <p>Cargando usuarios...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username} - {user.email}</li>
        ))}
      </ul>
      <h3>Agregar Usuario</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default Users;
