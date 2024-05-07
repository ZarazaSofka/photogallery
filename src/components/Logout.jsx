import React from "react";
import { deleteUserFromLocalStorage } from "../auth";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteUserFromLocalStorage();
    navigate("/auth");
  };

  handleLogout();
}
