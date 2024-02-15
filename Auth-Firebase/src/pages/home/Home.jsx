import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faListAlt } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const Home = () => {
  
  return (
    <div className="container mt-5">
      <h1 className="text-center">Panel de Gestión de Inventario</h1>
      <div className="d-flex justify-content-center mt-4">
        <Button variant="success" className="me-2" href="/add-item">
          <FontAwesomeIcon icon={faPlusCircle} /> Añadir Artículo
        </Button>
        <Button variant="info" href="/items">
          <FontAwesomeIcon icon={faListAlt} /> Ver Inventario
        </Button>
      </div>
    </div>
  );
};

export default Home;
