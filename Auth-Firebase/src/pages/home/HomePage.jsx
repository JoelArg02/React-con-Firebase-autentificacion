import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarehouse, faChartLine, faCogs } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, CardGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestión de Inventario de Bodega</h1>
      <div className="text-center">
        <FontAwesomeIcon icon={faWarehouse} size="6x" className="mb-3" />
        <p>Optimiza tu espacio, mejora la eficiencia y aumenta la productividad de tu bodega con nuestra solución integral.</p>
        <Button variant="primary" onClick={() => navigate('/login')}>Iniciar Sesión</Button>
        <Button variant="outline-secondary" className="ms-3" onClick={() => navigate('/register')}>Registrarse</Button>
      </div>

      <CardGroup className="mt-5">
        <Card className="text-center">
          <Card.Body>
            <FontAwesomeIcon icon={faChartLine} size="4x" className="card-img-top mx-auto" />
            <Card.Title className="mt-3">Análisis en Tiempo Real</Card.Title>
            <Card.Text>Monitorea tu inventario con informes y análisis en tiempo real para tomar decisiones informadas.</Card.Text>
          </Card.Body>
        </Card>

        <Card className="text-center">
          <Card.Body>
            <FontAwesomeIcon icon={faCogs} size="4x" className="card-img-top mx-auto" />
            <Card.Title className="mt-3">Automatización de Procesos</Card.Title>
            <Card.Text>Automatiza los procesos de recepción, almacenamiento y despacho para maximizar la eficiencia operativa.</Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
};

export default HomePage;
