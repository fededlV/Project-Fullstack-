import  Table  from "react-bootstrap/Table";
import {Button} from "react-bootstrap";

export default function HorarioTable({
    horario,
    handleEdit,
    deleteHorario,
    getNombreProfesor,
    getNombreAsignatura,
    getNombreCurso
  }) {
    return (
      <div>
        <Table responsive>
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
          {horario &&
            horario.map(
              (
                hor, index //Se recorre el array de materiales y se muestra en la tabla
              ) => (
                <tr key={index}>
                  <td>{hor.Dia}</td>
                  <td>{hor.Hora_Inicio}</td>
                  <td>{hor.Hora_Fin}</td>
                  <td>{hor.Aula}</td>
                  <td>{getNombreAsignatura(hor.Id_Asignatura)}</td>
                  <td>{getNombreCurso(hor.Id_Curso)}</td>
                  <td>{getNombreProfesor(hor.Id_Profesor)}</td> 
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleEdit(hor.Id_Horario)}
                    >
                      Editar
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => deleteHorario(hor.Id_Horario)}
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
