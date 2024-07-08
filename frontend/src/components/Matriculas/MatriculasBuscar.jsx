import { Form, Button, Container, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function MatriculaBuscar({
  matricula,
  noEncontrado,
  nombre,
  setNombre,
  curso,
  estudiante,
  buscarMatricula,
  onVolver,
  handleEdit,
  deleteMatricula,
}) {
  const {reset} = useForm();

  const getNombreCurso = (id) => {
    const cur = curso.find((cur) => cur.Id_Curso === id);
    return cur ? cur.Nombre : "Curso no encontrado";
  }
  
  const getNombreApellidoEstudiante = (id) => {
    const est = estudiante.find((est) => est.Id_Estudiante === id);
    return est ? est.Nombre + " " + est.Apellido : "Estudiante Desconocido";
  }

  const handleClean = (e) => {
    e.preventDefault();
  }

  
  const handleSearch = (nombre) => {
    buscarMatricula(nombre);
  }

  const handleVolver = () => {
    reset();
    setNombre("");
    onVolver();
  }

  const handleEditClick = (id) => {
    reset();
    setNombre("");
    handleEdit(id);
  }

  const handleDelete = (id) => {
    reset();
    setNombre("");
    deleteMatricula(id);
  }
  return (
    <Container>
        <Form onSubmit={handleClean}>
        <Form.Group controlId="formID">
          <Form.Label>Nombre del estudiante para ver matricula</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese Nombre del alumno para su matricula"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={() => handleSearch(nombre)}>Buscar</Button>
        <Button variant="secondary" onClick={handleVolver}>
            Volver
          </Button>
      </Form>
      {matricula ? (
        <Card style={{ width: "18rem" }}>
            <Card.Body>
            <Card.Title>Matricula del Estudiante</Card.Title>
            <Card.Text>Estudiante: {getNombreApellidoEstudiante(matricula.Id_Estudiante)}</Card.Text>
            <Card.Text>Fecha: {matricula.Fecha_Matricula}</Card.Text>
            <Card.Text>Curso: {getNombreCurso(matricula.Id_Curso)}</Card.Text>
            <Card.Text>Acciones:{" "}
              <Button variant="outline-primary" onClick={() => handleEditClick(matricula.Id_Matricula)}>Editar</Button>{" "}
              <Button variant="outline-danger" onClick={() => handleDelete(matricula.Id_Matricula)}>Eliminar</Button>
            </Card.Text>
          </Card.Body>
          
        </Card>
      ) : (
        noEncontrado && (
          <>
            <h3>Matricula del Alumno no encontrado</h3>
            <Button variant="secondary" onClick={handleVolver}>Volver</Button>
          </>
        )
      )}
    </Container>
  );
}