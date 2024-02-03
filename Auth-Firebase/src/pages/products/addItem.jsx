import React, { useState } from "react";
import { db } from "../../api/firebase-config"; // Asegúrate de importar tu configuración de Firebase
import { collection, addDoc } from "firebase/firestore";
import { Button, Form } from "react-bootstrap";

const AddItem = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const itemsCollectionRef = collection(db, "items"); // 'items' es el nombre de tu colección en Firestore

  const addItem = async () => {
    await addDoc(itemsCollectionRef, {
      name: name,
      quantity: Number(quantity),
    });
    setName("");
    setQuantity(0);
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Nuevo Artículo</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Nombre del Artículo</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingrese el nombre del artículo"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cantidad</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Ingrese la cantidad"
          />
        </Form.Group>

        <Button variant="primary" onClick={addItem}>
          Agregar Artículo
        </Button>
      </Form>
    </div>
  );
};

export default AddItem;
