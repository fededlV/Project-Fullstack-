import { Form, Button, Container, Card } from "react-bootstrap";

export default function MaterialBuscar({
  material,
  noEncontrado,
  desc,
  setDesc,
  buscarMaterial,
  onVolver,
  handleEdit,
  deleteMaterial,
}) {
  return (
    <Container>
      <Form>
        <Form.Group controlId="formDescricion">
          <Form.Label>Descripcion del Curso para ver Materiales</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese descripcion del Curso para sus materiales"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={() => buscarMaterial(desc)}>Buscar</Button>
      </Form>
      {material ? (
        <Card style={{ width: "18rem" }}>
            <Card.Body>
            <Card.Title>Material</Card.Title>
            <Card.Text>Descripcion del material: {material.Descripcion}</Card.Text>
            <Card.Text>Tipo de Material: {material.Tipo_Material}</Card.Text>
            <Card.Text>URL: {material.URL}</Card.Text>
            <Card.Text>Id del Curso: {material.Id_Curso}</Card.Text>
            <Card.Text>Acciones:{" "}
              <Button variant="outline-primary" onClick={() => handleEdit(material.Id_Material)}>Editar</Button>{" "}
              <Button variant="outline-danger" onClick={() => deleteMaterial(material.Id_Material)}>Eliminar</Button>
            </Card.Text>
          </Card.Body>
          <Button variant="secondary" onClick={onVolver}>
            Volver
          </Button>
        </Card>
      ) : (
        noEncontrado && (
          <>
            <h3>Material del Curso no encontrado</h3>
            <Button variant="secondary" onClick={onVolver}>Volver</Button>
          </>
        )
      )}
    </Container>
  );
}