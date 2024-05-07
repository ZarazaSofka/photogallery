import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import PhotoSetPage from "./pages/PhotoSetPage";
import PhotoGalleryPage from "./pages/PhotoGalleryPage";
import { getUserFromLocalStorage } from "./auth";

export default function App() {
  const user = getUserFromLocalStorage();

  return (
    <Router>
      <Switch>
        <Route path="/" component={() => <HomePage user={user} />} />
        <Route
          path="/gallery"
          component={() => <PhotoGalleryPage user={user} />}
        />
        <Route
          path="/profile/:userId"
          component={() => <ProfilePage user={user} />}
        />
        <Route
          path="/profile/:userId"
          component={() => <PhotoSetPage user={user} />}
        />
        <Route
          path="/logout"
          render={() => (user ? <Logout /> : <Redirect to="/auth" />)}
        />
        <Route
          path="/auth"
          render={() => (user ? <Redirect to="/" /> : <AuthPage />)}
        />
      </Switch>
    </Router>
  );
}
