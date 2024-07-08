import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function CalificacionBuscar({
  calificacion,
  noEncontrado,
  nombre,
  setNombre,
  apellido,
  setApellido,
  estudiante,
  asignatura,
  buscarCalificacion,
  onVolver,
  handleEdit,
  deleteCalificacion,
}) {
  const { reset } = useForm();

  const getNombreAsignatura = (id) => {
    const asig = asignatura.find((asig) => asig.Id_Asignatura === id);
    return asig ? asig.Nombre : "Asignatura desconocida";
  };

  const getNombreApellidoEstudiante = (id) => {
    const est = estudiante.find((est) => est.Id_Estudiante === id);
    return est ? est.Nombre + " " + est.Apellido : "Estudiante Desconocido";
  };

  const handleClean = (e) => {
    e.preventDefault();
  }

  const handleSearch = (nombre, apellido) => {
    buscarCalificacion(nombre, apellido); // Llama a la función de búsqueda con los criterios.
  };

  const handleVolver = () => {
    reset(); // Resetea los valores del form.
    setNombre(""); // Resetea el valor del input.
    setApellido("");
    onVolver();
  };

  const handleEditClick = (id) => {
    reset();
    setNombre("");
    setApellido("");
    handleEdit(id);
  };

  const handleDelete = (id) => {
    reset();
    setNombre("");
    setApellido("");
    deleteCalificacion(id);
  };

  return (
    <Container>
      <h1>Buscar Calificaciones</h1>
      <Form onSubmit={handleClean}>
        <Form.Group as={Row} controlId="formNombre">
          <Form.Label column sm={2}>
            Nombre:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formApellido">
          <Form.Label column sm={2}>
            Apellido:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        <Button variant="primary" onClick={() => handleSearch(nombre, apellido)}>
          Buscar
        </Button>
        </Form>
      {calificacion ? (
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={`https://www.robohash.org/${calificacion.Id_Calificacion}/100px180`}
          />
          <Card.Body>
            <Card.Title>Nombre: {getNombreApellidoEstudiante(calificacion.Estudiante_Id)}</Card.Title>
            <Card.Text>Asignatura: {getNombreAsignatura(calificacion.Asignatura_Id)}</Card.Text>
            <Card.Text>Nota: {calificacion.Nota}</Card.Text>
            <Card.Text>Fecha: {calificacion.Fecha}</Card.Text>
            <Card.Text>
              Acciones:{" "}
              <Button variant="outline-primary" onClick={() => handleEditClick(calificacion.Id_Calificacion)}>
                Editar
              </Button>{" "}
              <Button variant="outline-danger" onClick={() => handleDelete(calificacion.Id_Calificacion)}>
                Eliminar
              </Button>
            </Card.Text>
          </Card.Body>
          <Button variant="secondary" onClick={handleVolver}>
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
