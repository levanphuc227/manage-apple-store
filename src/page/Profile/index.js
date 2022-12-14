import React from "react";
import AuthService from "../../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="wrap-table">
      <div className="container-profile">
        <header className="jumbotron">
          <h3>
            <strong>Username: {currentUser.username}</strong>
          </h3>
        </header>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.listRules &&
            currentUser.listRules.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
