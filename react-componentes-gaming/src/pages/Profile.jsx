import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { loggedInUser, logoutUser } = useContext(UserContext);

  if (!loggedInUser) {
    return <p>No has iniciado sesión.</p>;
  }

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="profile-container">
      <h2>Perfil de Usuario</h2>
      <p><strong>Email:</strong> {loggedInUser.email}</p>
      {/* Puedes agregar más información del usuario aquí */}
      <button onClick={handleLogout} className="btn-logout">
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;
