import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

export default function AsistenciaTable({
  asistencia,
  estudiante,
  horario,
  handleEdit,
  deleteAsistencia,
}) {

  //Obtener el nombre y apellido del estudiante
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
    return hor ? hor.Hora_Inicio + "-" + hor.Hora_Fin : "Desconocido";
  }

  const getAula = (id) => {
    const hor = horario.find((hor) => hor.Id_Horario === id);
    return hor ? hor.Aula : "Desconocido";
  }

  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Dia Horario</th>
            <th>HoraInicio-HoraFin</th>
            <th>Aula</th>
            <th>Asistio</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asistencia &&
            asistencia.map(
              (
                asis, index //Se recorre el array de asistencias y se muestra en la tabla
              ) => (
                <tr key={index}>
                  <td>{getNombreApellidoEstudiante(asis.Id_Estudiante)}</td>
                  <td>{getDia(asis.Id_Horario)}</td>
                  <td>{getHora(asis.Id_Horario)}</td>
                  <td>{getAula(asis.Id_Horario)}</td>
                  <td>{asis.Asistio ? "Presente" : "Ausente"}</td>
                  <td>{asis.Fecha}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleEdit(asis.Id_Asistencia)}
                    >
                      Editar
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => deleteAsistencia(asis.Id_Asistencia)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </Table>
    </div>
  );
}
