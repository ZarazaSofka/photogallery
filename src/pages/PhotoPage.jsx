import React from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

function PhotoPage() {
  const match = useRouteMatch();

  return (
    <div>
      <h2>Фотографии</h2>
      <Switch>
        <Route path={`${match.path}/:photoId`}>
          <Photo />
        </Route>
        <Route path={match.path}>
          <PhotoList />
        </Route>
      </Switch>
    </div>
  );
}
