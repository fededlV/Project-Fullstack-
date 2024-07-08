import { Form, Button, Container, Card } from "react-bootstrap";

export default function EstudianteBuscar({
  estudiante,
  noEncontrado,
  nombre,
  setNombre,
  buscarEstudiante,
  onVolver,
  handleEdit,
  deleteEstudiante,
}) {
  return (
    <Container>
      <Form>
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre del Estudiante</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese Nombre del estudiante"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={() => buscarEstudiante(nombre)}>
          Buscar
        </Button>
      </Form>
      {estudiante ? (
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={`https://www.robohash.org/${estudiante.Id_Estudiante}/100px180`} //Es una pagina que nos proporciona imagenes aleatorias de robots dependendiendo del id, es para que se vea una imagen en el card. :)
          />
          <Card.Body>
            <Card.Title>Estudiante Nombre: {estudiante.Nombre}</Card.Title>
            <Card.Text>Apellido: {estudiante.Apellido}</Card.Text>
            <Card.Text>
              Fecha de Nacimiento: {estudiante.Fecha_nacimiento}
            </Card.Text>
            <Card.Text>Telefono: {estudiante.Telefono}</Card.Text>
            <Card.Text>Email: {estudiante.Email}</Card.Text>
            <Card.Text>Direccion: {estudiante.Direccion}</Card.Text>
            <Card.Text>
              Acciones:{" "}
              <Button variant="outline-primary" onClick={() => handleEdit(estudiante.Id_Estudiante)}>
                Editar
              </Button>{" "}
              <Button
                variant="outline-danger"
                onClick={() => deleteEstudiante(estudiante.Id_Estudiante)}
              >
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
            <h3>Estudiante no encontrado</h3>
            <Button variant="secondary" onClick={onVolver}>
              Volver
            </Button>
          </>
        )
      )}
    </Container>
  );
}
