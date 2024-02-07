import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Badge, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faToggleOn,
  faToggleOff,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { getItems, updateItem, deleteItem } from "../../api/firebase-db"; // Ajusta la ruta de importación según sea necesario

const PAGE_SIZE = 10;

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    name: "",
    quantity: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  const fetchItems = async (page) => {
    setLoading(true);
    try {
      const response = await getItems(page, PAGE_SIZE);
      console.log("Response from getItems:", response); // Agregar esta línea
      setItems(response);
      setTotalPages(Math.ceil(response.length / PAGE_SIZE));
    } catch (error) {
      console.error("Error fetching items: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const startEditItem = (item) => {
    setCurrentItem(item);
    setShowEditModal(true);
  };

  const saveItem = async () => {
    await updateItem(currentItem.id, currentItem);
    setShowEditModal(false);
    fetchItems(currentPage); // Refrescar los items tras la edición
  };

  const confirmDeleteItem = (item) => {
    setCurrentItem(item);
    setShowDeleteModal(true);
  };

  const executeDeleteItem = async () => {
    await deleteItem(currentItem.id);
    setShowDeleteModal(false);
    fetchItems(currentPage); // Refrescar los items tras la eliminación
  };

  // Componente de paginación
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Listado de Artículos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.category}</td>
              <td>${item.price}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => startEditItem(item)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => confirmDeleteItem(item)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {loading && <p>Cargando...</p>}
      <Pagination>{paginationItems}</Pagination>

      {/* Modales de edición y eliminación */}
      {/* Modal de Edición */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Artículo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Campos del formulario para edición */}
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentItem.name}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={currentItem.quantity}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={currentItem.category}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={currentItem.price}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={saveItem}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Confirmación de Eliminación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este artículo?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={executeDeleteItem}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ItemList;
