import { Form, Button, Container, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function HorarioBuscar({
  horario,
  noEncontrado,
  nombre,
  setNombre,
  curso,
  profesor,
  asignatura,
  buscarHorario,
  onVolver,
  handleEdit,
  deleteHorario,
}) {
  const {reset} = useForm();

  const getNombreCurso = (id) => {
    const cur = curso.find((cur) => cur.Id_Curso === id);
    return cur ? cur.Nombre : "Curso no encontrado";
  }
  
  const getNombreAsignatura = (id) => {
    const asig = asignatura.find((asig) => asig.Id_Asignatura === id);
    return asig ? asig.Nombre : "Asignatura Desconocido";
  }

  const getNombreApellidoProfe = (id) => {
    const prof = profesor.find((prof) => prof.Id_Profesor === id);
    return prof ? prof.Nombre  + " " + prof.Apellido: "Profesor Desconocido";
  }
  
  const handleSearch = () => {
    buscarHorario(nombre);
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
    deleteHorario(id);
  }

  return (
    <Container>
      <Form>
        <Form.Group controlId="formID">
          <Form.Label>Dia de la semana para el horario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el dia de la semana para el horario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSearch}>Buscar</Button>
        <Button variant="secondary" onClick={handleVolver}>
            Volver
        </Button>
      </Form>
      <h2>Resultados</h2>
      {horario ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Dia</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th>Aula</th>
              <th>Asignatura</th>
              <th>Curso</th>
              <th>Profesor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(horario) && horario.map((hor) => (
              <tr key={hor.Id_Horario}>
                <td>{hor.Dia}</td>
                <td>{hor.Hora_Inicio}</td>
                <td>{hor.Hora_Fin}</td>
                <td>{hor.Aula}</td>
                <td>{getNombreAsignatura(hor.Id_Asignatura)}</td>
                <td>{getNombreCurso(hor.Id_Curso)}</td>
                <td>{getNombreApellidoProfe(hor.Id_Profesor)}</td>
                <td>
                  <Button variant="primary" 
                    onClick={() => handleEditClick(hor.Id_Horario)}
                    >
                      Editar
                  </Button>{" "}
                  <Button variant="danger" onClick={() => handleDelete(hor.Id_Horario)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        noEncontrado && (
          <>
            <h3>El horario de la asignatura no encontrado</h3>
            <Button variant="secondary" onClick={handleVolver}>Volver</Button>
          </>
        )
      )}
    </Container>
  );
}