import { logout } from "../api/user";
import { deleteUserFromLocalStorage } from "../auth";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  handleLogout();
}
