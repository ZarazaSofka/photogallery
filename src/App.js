import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/photo">Галерея</Link>
          </li>
          <li>
            <Link to="/profile">Профиль</Link>
          </li>
          <li>
            <Link to="/logout">Выйти</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/photo">
            <PhotoPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/auth">
            <AuthPage />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Photo() {
  let { photoId } = useParams();
  return <h3>Requested photo ID: {photoId}</h3>;
}
