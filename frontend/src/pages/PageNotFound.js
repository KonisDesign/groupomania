import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <h1>Page Introuvable</h1>
      <h3>
        <Link to="/"> Retourner à l'accueil</Link>
      </h3>
    </div>
  );
}

export default PageNotFound;