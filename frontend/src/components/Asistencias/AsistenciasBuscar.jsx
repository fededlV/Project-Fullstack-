import { Form, Button, Container, Table, Row, Col } from "react-bootstrap";

export default function AsistenciaBuscar({
  asistencia,
  estudiante,
  horario,
  noEncontrado,
  fecha,
  setFecha,
  horaInicio,
  setHoraInicio,
  horaFin,
  setHoraFin,
  buscarAsistencia,
  onVolver,
  handleEdit,
  deleteAsistencia,
}) {
  const getNombreApellidoEstudiante = (id) => {
    const est = estudiante.find((est) => est.Id_Estudiante === id);
    return est ? est.Nombre + " " + est.Apellido : "Desconocido";
  }

  const getDia = (id) => {
    const hor = horario.find((hor) => hor.Id_Horario === id);
    return hor ? hor.Dia : "Desconocido";
  }

  const getHora = (id) => {
    const hor = horario.find((hor) => hor.Id_Horario === id);
    return hor ? hor.Hora_Inicio + " - " + hor.Hora_Fin : "Desconocido";
  }

  const getAula = (id) => {
    const hor = horario.find((hor) => hor.Id_Horario === id);
    return hor ? hor.Aula : "Desconocido";
  }
  return (
    <Container>
      <h1>Buscar Asistencias</h1>
      <Form onSubmit={(e) => { e.preventDefault(); buscarAsistencia(); }}>
        <Form.Group as={Row} controlId="formFecha">
          <Form.Label column sm={2}>Fecha:</Form.Label>
          <Col sm={10}>
            <Form.Control 
              type="date" 
              value={fecha} 
              onChange={(e) => setFecha(e.target.value)} 
              required 
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHoraInicio">
          <Form.Label column sm={2}>Hora Inicio:</Form.Label>
          <Col sm={10}>
            <Form.Control 
              type="time" 
              value={horaInicio} 
              onChange={(e) => setHoraInicio(e.target.value)} 
              required 
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHoraFin">
          <Form.Label column sm={2}>Hora Fin:</Form.Label>
          <Col sm={10}>
            <Form.Control 
              type="time" 
              value={horaFin} 
              onChange={(e) => setHoraFin(e.target.value)} 
              required 
            />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Buscar
        </Button>
      </Form>
      <h2>Resultados</h2>
      {asistencia ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Dia</th>
              <th>Hora Inicio - Hora Fin</th>
              <th>Aula</th>
              <th>Asistencia</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asistencia.map((asistencia) => (
              <tr key={asistencia.Id_Asistencia}>
                <td>{getNombreApellidoEstudiante(asistencia.Id_Estudiante)}</td>
                <td>{getDia(asistencia.Id_Horario)}</td>
                <td>{getHora(asistencia.Id_Horario)}</td>
                <td>{getAula(asistencia.Id_Horario)}</td>
                <td>{asistencia.Asistio ? "Presente" : "Ausente"}</td>
                <td>{asistencia.Fecha}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleEdit(asistencia.Id_Asistencia)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => deleteAsistencia(asistencia.Id_Asistencia)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <Button variant="secondary" onClick={onVolver}>
              Volver
          </Button>
        </Table>
      ) : (
        noEncontrado && (
          <>
            {" "}
            <h3>No se encontraron asistencias con los criterios especificados.</h3>
            {" "}
            <Button variant="secondary" onClick={onVolver}>
              Volver
            </Button>
          </>
        )
      )}
    </Container>
  );
}