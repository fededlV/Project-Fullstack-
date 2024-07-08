import { Form, Button, Container, Card } from "react-bootstrap";

export default function ProfesoresBuscar({
  profesor,
  noEncontrado,
  nombre,
  setNombre,
  buscarProfesor,
  onVolver,
  handleEdit,
  deleteProfesor,
}) {
  return (
    <Container>
      <Form>
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre del Profesor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese Nombre del profesor"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={() => buscarProfesor(nombre)}>
          Buscar
        </Button>
      </Form>
      {profesor ? (
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={`https://www.robohash.org/${profesor.Id_Profesor}/100px180`}
          />
          <Card.Body>
            <Card.Title>Nombre: {profesor.Nombre}</Card.Title>
            <Card.Text>Apellido: {profesor.Apellido}</Card.Text>
            <Card.Text>Especialidad: {profesor.Especialidad}</Card.Text>
            <Card.Text>Telefono: {profesor.Telefono}</Card.Text>
            <Card.Text>Email: {profesor.Email}</Card.Text>
            <Card.Text>Fecha de Nacimiento: {profesor.Fecha_Nacimiento}</Card.Text>
            <Card.Text>
              Acciones:{" "}
              <Button variant="outline-primary" onClick={() => handleEdit(profesor.Id_Profesor)}>
                Editar
              </Button>{" "}
              <Button variant="outline-danger" onClick={() => deleteProfesor(profesor.Id_Profesor)}>
                Eliminar
              </Button>
            </Card.Text>
          </Card.Body>
          <Button variant="secondary" onClick={onVolver}>
            Volver
          </Button>
        </Card>
      ) : (
        noEncontrado && (
          <>
            <h3>Profesor no encontrado</h3>
            <Button variant="secondary" onClick={onVolver}>
              Volver
            </Button>
          </>
        )
      )}
    </Container>
  );
}

