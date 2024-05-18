import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import PhotoSetPage from "./pages/PhotoSetPage";
import PhotoGalleryPage from "./pages/PhotoGalleryPage";
import { isAuthenticated, useUser } from "./auth";
import Logout from "./components/Logout";

export default function AppRouter() {
  const { user } = useUser();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<PhotoGalleryPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/set/:setId" element={<PhotoSetPage />} />
        <Route
          path="/logout"
          element={isAuthenticated(user) ? <Logout /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={isAuthenticated(user) ? <Navigate to="/" /> : <AuthPage />}
        />
      </Routes>
    </Router>
  );
}
