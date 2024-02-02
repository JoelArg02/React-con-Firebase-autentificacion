import React, { useState } from "react";
import { auth } from "../../api/firebase-config";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const LoginForm = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState(null);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        setUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
        setShowModal(true);

        localStorage.setItem("userToken", token);
      })
      .catch((error) => {
        console.error("Error al iniciar sesión con Google:", error.message);
      });
  };

  const handleSignInWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      setShowModal(true);
      setErrorAlert(null); // Limpiar cualquier alerta anterior
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setErrorAlert("Usuario o contraseña incorrectos."); // Mostrar el mensaje de error
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "300px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Iniciar Sesión</Card.Title>
          {errorAlert && <Alert variant="danger">{errorAlert}</Alert>}
          <Form onSubmit={handleSignInWithEmailAndPassword}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-2">
              Entrar
            </Button>
          </Form>
          <Button variant="danger" className="w-100" onClick={signInWithGoogle}>
            Iniciar sesión con Google
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Datos del Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user && (
            <div>
              <p>
                <strong>Nombre:</strong> {user.displayName}
              </p>
              <p>
                <strong>Correo Electrónico:</strong> {user.email}
              </p>
              {/* Puedes agregar más datos del usuario aquí */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginForm;
