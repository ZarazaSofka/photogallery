import { Link, useNavigate } from "react-router-dom";
import {
  isAuthenticated,
  hasRole,
  useUser,
  deleteUserFromLocalStorage,
} from "../auth";
import { logout } from "../api/user";
import "./styles/Header.style.css";

const Header = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout()) {
      deleteUserFromLocalStorage();
      updateUser(null);
      navigate("/auth");
    }
  };

  return (
    <header>
      <Link id="logo-ref" to="/">
        <h1>qPhoto</h1>
      </Link>
      <div>
        <nav className="menu" id="menu">
          <Link to="/gallery">Галерея</Link>
          {isAuthenticated(user) && (
            <Link to={`/profile/${user.id}`}>Профиль</Link>
          )}
          {hasRole(user, "ROLE_ADMIN") && <Link to="/users">Пользователи</Link>}
          {!isAuthenticated(user) && <Link to="/auth">Войти</Link>}
          {isAuthenticated(user) && (
            <Link to="#" onClick={handleLogout}>
              Выйти
            </Link>
          )}
        </nav>
        <div className="dropdown-menu-container">
          <div className="activator" id="activator" />
          <nav className="dropdown-menu" id="dropdown-menu">
            <Link to="/gallery">Галерея</Link>
            {isAuthenticated(user) && (
              <Link to={`/profile/${user.id}`}>Профиль</Link>
            )}
            {hasRole(user, "ROLE_ADMIN") && (
              <Link to="/users">Пользователи</Link>
            )}
            {!isAuthenticated(user) && <Link to="/auth">Войти</Link>}
            {isAuthenticated(user) && (
              <Link to="#" onClick={handleLogout}>
                Выйти
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
